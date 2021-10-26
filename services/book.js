const books = require('../models').books;
const users = require('../models').users;
const user_borrowed_books = require('../models').user_borrowed_books;
const { ValidationError, Op } = require('sequelize')
const { formatResponse, getPagingData, getPagination } = require('../helpers')

module.exports = {
    add: async (data) => {
        let { name, edition, isbn, price, total_books, publisher_id } = data
        let payload = { name, edition, isbn, price, total_books, publisher_id }
        try {
            let list = await books.create(payload)
            return formatResponse(200, list)
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
    list: async (req) => {
        try {
            let { page = 0, size = 1 } = req.query
            const { limit, offset } = getPagination(parseInt(page), parseInt(size));
            let list = await books.findAndCountAll({
                limit,
                offset,
                include: [{
                    model: users,
                    as: 'borrowedUserDetails',
                    attributes: ['id', 'name', 'mobile_number', 'email'],
                    through: {
                        attributes: ['borrowed_date','due_date']
                    }
                }]
            })
            list.rows.map(data => data.getTotalAvailableBooks())
            let response = getPagingData(list, page, limit);
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
            else {
                console.log(e, "Internal error")
            }
        }
    },
    borrowBook: async (data) => {
        let { user_id, book_id, publisher_id,borrowed_date,due_date } = data
        let payload = { user_id, book_id, publisher_id,borrowed_date,due_date }
        try {
            let isBookAlreadyTaken = await user_borrowed_books.findOne({
                limit: 1,
                where: {
                    user_id,
                    book_id
                }
            })
            let list = await books.findOne({ where:{ id:book_id }, include: ['borrowedUserDetails'] })

            list.getTotalAvailableBooks()

            if (!isBookAlreadyTaken && list.dataValues.availableBooks > 0) {
                let list = await user_borrowed_books.create(payload)
                return formatResponse(200, list)
            }
            else {
                return formatResponse(400, null, isBookAlreadyTaken ? "BOOK_ALREADY_TAKEN" : "BOOK_NOT_AVAILABLE")
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
}