const { check } = require('express-validator')

module.exports = {
    addPublisher: [
        check('publisher_name', 'publisher_name is required').not().isEmpty()
    ]
}