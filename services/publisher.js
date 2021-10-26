const publishers = require('../models').publishers;
const books = require('../models').books;
const { ValidationError, Op } = require('sequelize')
const { formatResponse } = require('../helpers')

module.exports = {
    add: async (data) => {
        let { publisher_name } = data
        try {
            let isPublisherAlreadyExists = await publishers.findOne({
                limit: 1,
                where: {
                    publisher_name,
                }
            })
            if (!isPublisherAlreadyExists) {
                let list = await publishers.create({ publisher_name })
                return formatResponse(200, list)
            }
            else {
                return formatResponse(400, null, "PUBLISHER_ALREADY_EXISTS")
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
    list: async (data) => {
        try {
            let list = await publishers.findAll({
                include :['booksPublished']
            })
            return formatResponse(200, list)
        }
        catch (err) {
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
}