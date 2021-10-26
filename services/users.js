const users = require('../models').users;
const roles = require('../models').roles;
const publishers = require('../models').publishers;
const user_roles = require('../models').user_roles;
const books = require('../models').books;
const { ValidationError, Op } = require('sequelize')
const { formatResponse, getPagingData, getPagination } = require('../helpers')

module.exports = {
    signUp: async (data) => {
        try {
            let {
                mobile_number,
                email
            } = data

            let isUserAlreadyExist = await users.findOne({
                limit: 1,
                where: {
                    [Op.or]: [
                        {
                            mobile_number
                        },
                        {
                            email
                        }
                    ]
                }
            })
            if (!isUserAlreadyExist) {
                let list = await users.create(data)
                return formatResponse(200, list.toJSON({ attributes:['name','email','mobile_number'] }))
            }
            else {

                return formatResponse(400, null, "SIGN_UP_EMAIL_ID_OR_MOBILE_EXISTS")
            }
        }
        catch (e) {
            if (e instanceof ValidationError) {
                const messages = {};
                console.log(e)
                e.errors.forEach((error) => {
                    messages[error.path] = error.message;
                });
                return formatResponse(500, "TECHNICAL_ERROR")
            }
            else {
                console.log(e, "Internal error")
            }
        }
    },
    signIn: async (data) => {
        try {
            let {
                email,
                password
            } = data

            let User = await users.findOne({
                limit: 1,
                where: {
                    email,
                },
                attributes: ['mobile_number', 'email', 'password', 'id']
            })
            if (User && User.checkIsValidPassword(password)) {
                User.generateToken()
                return formatResponse(200, User, 'SIGN_IN_VALID_CREDENTIAL')
            } else {
                return formatResponse(400, null, "SIGN_IN_INVALID_CREDENTIAL")
            }
        }
        catch (e) {
            if (e instanceof ValidationError) {
                const messages = {};
                console.log(e)
                e.errors.forEach((error) => {
                    messages[error.path] = error.message;
                });
                return formatResponse(500, "TECHNICAL_ERROR")
            }
            console.log(e, "Internal error")
        }
    },
    getUserList: async (req) => {
        try {
            let { page = 0, size } = req.query
            const { limit, offset } = getPagination(parseInt(page), parseInt(size));
            let User = await users.findAndCountAll({
                limit,
                offset,
                attributes: ['mobile_number', 'email'],
                include: [
                    {
                        model: roles,
                        as: 'roles',
                        attributes: ['role'],
                        through: {
                            attributes: ['role_id']
                        }
                    },
                    {
                        model: books,
                        as: 'borrowedBooks',
                        include: [
                            { model: publishers, as: 'publisherDetails', attributes: ['publisher_name'] }
                        ],
                        attributes: ['name', 'edition', 'isbn', 'price', 'total_books','publisher_id'],
                        through: {
                            attributes: []
                        }
                    }
                ]
            })
            let response = getPagingData(User, page, limit);
            return formatResponse(200, response)
        }
        catch (e) {
            if (e instanceof ValidationError) {
                const messages = {};
                console.log(e)
                e.errors.forEach((error) => {
                    messages[error.path] = error.message;
                });
                return formatResponse(500, "TECHNICAL_ERROR")
            }
            console.log(e, "Internal error")
        }
    }
}