const express = require('express');
const router = express.Router();
const authRoutes = require('./users');
const roleRoutes = require('./roles');
const publisherRoutes = require('./publisher');
const bookRoutes = require('./books');

router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.use('/user',authRoutes)
router.use('/role',roleRoutes)
router.use('/book',bookRoutes)
router.use('/publisher',publisherRoutes)

module.exports = router