const { check } = require('express-validator')

module.exports = {
    addRoleValidator: [
        check('role', 'role is required').not().isEmpty()
    ],
    addRoleToUser : [
        check('role_id', 'role_id is required').not().isEmpty()
    ]
}