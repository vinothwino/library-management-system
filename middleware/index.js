const { formatResponse } = require('../helpers')
const { validationResult } = require('express-validator')
const messages = require('../messages')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const jwt = require('jsonwebtoken')

const handleFieldError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = errors.array()[0].msg;
        return res.status(400).json(
            {
                status: 400,
                data: null,
                message
            }
        );
    }
    next()
}

const authorize = (req, res, next) => {
    let { token } = req.headers
    let unAuthoziedResData = formatResponse(401, null, 'UNAUTHORIZED')
    if (!token)
        return res.status(401).json(unAuthoziedResData)
    let user = jwt.verify(token, config.JWT_SECRET)
    if (!user)
        return res.status(401).json(unAuthoziedResData)
    req.user = user
    next()

}


module.exports = {
    handleFieldError,
    authorize
}