const roles = require('../models').roles;
const user_roles = require('../models').user_roles;
const { ValidationError, Op } = require('sequelize')
const { formatResponse } = require('../helpers')

module.exports = {
    add: async (data) => {
        let { role } = data
        try {
            let isRoleAlreadyExists = await roles.findOne({
                limit: 1,
                where: {
                    role
                }
            })
            if (!isRoleAlreadyExists) {
                let list = await roles.create({ role })
                return formatResponse(200, list)
            }
            else {
                return formatResponse(400, null, "ROLE_ALREADY_EXISTS")
            }
        }
        catch (e) {
            if (e instanceof ValidationError) {
                const messages = {};
                console.log(e)
                e.errors.forEach((error) => {
                    messages[error.path] = error.message;
                });
                return formatResponse(500, "TECHNICAL_ERROR")
            }
            else {
                console.log(e, "Internal error")
            }
        }
    },
    list: async (data) => {
        try {
            let list = await roles.findAll()
            return formatResponse(200, list)
        }
        catch (err) {
            if (e instanceof ValidationError) {
                const messages = {};
                console.log(e)
                e.errors.forEach((error) => {
                    messages[error.path] = error.message;
                });
                return formatResponse(500, "TECHNICAL_ERROR")
            }
            else {
                console.log(e, "Internal error")
            }
        }
    },
    userRoleList: async (data) => {
        try {
            let list = await user_roles.findAll({ attributes : ['user_id','role_id'], include : ['profile','roles'] })
            return formatResponse(200, list)
        }
        catch (err) {
            if (e instanceof ValidationError) {
                const messages = {};
                console.log(e)
                e.errors.forEach((error) => {
                    messages[error.path] = error.message;
                });
                return formatResponse(500, "TECHNICAL_ERROR")
            }
            else {
                console.log(e, "Internal error")
            }
        }
    },
    assignRole: async (data) => {
        let { role_id,user_id } = data
        console.log(data)
        try {
            let isAlreadyRoleAssigned = await user_roles.findOne({
                limit: 1,
                where: {
                    user_id,
                    role_id
                },
                attributes : ['user_id','role_id']
            })
            if (!isAlreadyRoleAssigned) {
                let created = await user_roles.create({ user_id,role_id })
                return formatResponse(200, created)
            }
            else {
                return formatResponse(400, null, "ROLE_ALREADY_ASSIGNED")
            }
        }
        catch (e) {
            if (e instanceof ValidationError) {
                const messages = {};
                console.log(e.errors,"error")
                e.errors.forEach((error) => {
                    messages[error.path] = error.message;
                });
                return formatResponse(500,null, "TECHNICAL_ERROR")
            }
            else {
                return formatResponse(500,e, "TECHNICAL_ERROR")
            }
        }
    }
}
