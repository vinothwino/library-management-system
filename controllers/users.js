const authServices = require('../services/users')

module.exports = {
    signUp: async (req, res) => {
        const { name, mobile_number, email, password } = req.body
        let data = {
            name,
            mobile_number,
            email,
            password
        }
        let responseData = await authServices.signUp(data)
        res.status(responseData.status).json(responseData)
    },
    signIn: async (req, res) => {
        const { email, password } = req.body
        let data = {
            email,
            password
        }
        let responseData = await authServices.signIn(data)
        res.status(responseData.status).json(responseData)
    }, 
    getUserList: async (req, res) => {
        let responseData = await authServices.getUserList(req)
        res.status(responseData.status).json(responseData)
    }
}