const router = require('express').Router()
const publisherController = require('../controllers/publisher')
const publisherValidator = require('../validation/publisher')
const { handleFieldError } = require('../middleware')
const { authorize } = require('../middleware')

router.use(authorize)

// @route    GET publisher/list
// @desc     List publisher
// @access   Private

router.get(
    '/list',
    publisherController.listPubliser
)

// @route    GET publisher/addPublisher
// @desc     Add publisher
// @access   Private


router.post(
    '/addPublisher',
    publisherValidator.addPublisher,
    handleFieldError,
    publisherController.addPublisher
)



module.exports = router