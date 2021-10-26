const roleServices = require('../services/roles')

module.exports = {
    addRole: async (req, res) => {
        const { role } = req.body
        let data = {
            role
        }
        let responseData = await roleServices.add(data)
        res.status(responseData.status).json(responseData)
    },
    getRolesList: async (req, res) => {
        let responseData = await roleServices.list()
        res.status(responseData.status).json(responseData)
    },
    assignRoleToUser: async (req, res) => {
        let data = { role_id : req.body.role_id,user_id:req.user.id}
        let responseData = await roleServices.assignRole(data)
        res.status(responseData.status).json(responseData)
    },
    getUserRoleList: async (req, res) => {
        let responseData = await roleServices.userRoleList()
        res.status(responseData.status).json(responseData)
    }
}