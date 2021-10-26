const bookServices = require('../services/book')
const moment = require('moment')

module.exports = {
    addBook: async (req, res) => {
        let responseData = await bookServices.add(req.body)
        res.status(responseData.status).json(responseData)
    },
    listBook: async (req, res) => {
        let responseData = await bookServices.list(req)
        res.status(responseData.status).json(responseData)
    },
    borrowBook: async (req, res) => {
        let data = {
            user_id: req.user.id,
            book_id: req.body.book_id,
            publisher_id: req.body.publisher_id,
            borrowed_date: moment().format('DD-MM-YYYY'),
            due_date: moment().add(30, 'days').format('DD-MM-YYYY')
        }
        let responseData = await bookServices.borrowBook(data)
        res.status(responseData.status).json(responseData)
    }
}