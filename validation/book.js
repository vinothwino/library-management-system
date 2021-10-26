const { check } = require('express-validator')

module.exports = {
    addBook: [
        check('name', 'name is required').not().isEmpty(),
        check('edition', 'edition is required').not().isEmpty(),
        check('isbn', 'isbn is required').not().isEmpty(),
        check('price', 'price is required').not().isEmpty(),
        check('total_books', 'total_books is required').not().isEmpty(),
        check('publisher_id', 'publisher_id is required').not().isEmpty()
    ],
    borrowBook : [
        check('publisher_id', 'publisher_id is required').not().isEmpty(),
        check('book_id', 'book_id is required').not().isEmpty(),
    ]
}