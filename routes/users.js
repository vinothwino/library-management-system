const router = require('express').Router()
const authController = require('../controllers/users')
const authValidator = require('../validation/users')
const { handleFieldError } = require('../middleware')

// @route    POST user/signup
// @desc     signup
// @access   Public

router.post(
    '/signup',
    authValidator.signUpValidator,
    handleFieldError,
    authController.signUp
)

// @route    POST user/signin
// @desc     signin
// @access   Public

router.post(
    '/signin',
    authValidator.signInValidator,
    handleFieldError,
    authController.signIn
)

// @route    GET user/getUserList
// @desc     get user list allong with role & borrowed book details
// @access   Public

router.get(
    '/getUserList',
    authController.getUserList
)


module.exports = router