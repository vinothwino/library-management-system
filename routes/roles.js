const router = require('express').Router()
const roleController = require('../controllers/roles')
const roleValidator = require('../validation/role')
const { handleFieldError } = require('../middleware')
const { authorize } = require('../middleware')

router.use(authorize)

// @route    GET role/getRoleList
// @desc     List roles
// @access   Private

router.get(
    '/getRoleList',
    roleController.getRolesList
)

// @route    POST role/addRole
// @desc     Add role
// @access   Private

router.post(
    '/addRole',
    roleValidator.addRoleValidator,
    handleFieldError,
    roleController.addRole
)

// @route    POST role/assignRoleToUser
// @desc     Add role to user
// @access   Private

router.post(
    '/assignRoleToUser',
    roleValidator.addRoleToUser,
    handleFieldError,
    roleController.assignRoleToUser
)

// @route    GET role/getUserRoles
// @desc     get user role LIST
// @access   Private

router.get(
    '/getUserRoles',
    roleController.getUserRoleList
)



module.exports = router