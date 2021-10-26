const router = require('express').Router()
const bookController = require('../controllers/book')
const bookValidator = require('../validation/book')
const { handleFieldError } = require('../middleware')
const { authorize } = require('../middleware')

router.use(authorize)


// @route    GET book/list
// @desc     Get book list
// @access   Private

router.get(
    '/list',
    bookController.listBook
)

// @route    GET book/add
// @desc     Add book
// @access   Private

router.post(
    '/add',
    bookValidator.addBook,
    handleFieldError,
    bookController.addBook
)

// @route    GET book/borrowBook
// @desc     Book temporarily borrowed by students
// @access   Private

router.post(
    '/borrowBook',
    bookValidator.borrowBook,
    handleFieldError,
    bookController.borrowBook
)


module.exports = router