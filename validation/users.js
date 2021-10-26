const { check } = require('express-validator')
const { regex } = require('../helpers')

module.exports = {
    signUpValidator: [
        check('name', 'name is required').not().isEmpty(),
        check('mobile_number', 'Mobile number is required').not().isEmpty()
        .isLength({ min: 10 })
        .withMessage('Enter the valid mobile number'),
        check('email', 'email is required').not().isEmpty()
        .isEmail()
        .withMessage('Enter the valid email'),
        check('password', 'Password is required').not().isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(regex.password)
        .withMessage('Password must contain one character & one special character!!')
    ],
    signInValidator: [
        check('email', 'mobile number is required').not().isEmpty()
        .isEmail()
        .withMessage('Enter the valid email'),
        check('password', 'mobile number is required').not().isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(regex.password)
        .withMessage('Password must contain one character & one special character!!')
    ],
}