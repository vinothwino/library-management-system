const publisherServices = require('../services/publisher')
module.exports = {
    addPublisher: async (req, res) => {
        const { publisher_name } = req.body
        let data = {
            publisher_name
        }
        let responseData = await publisherServices.add(data)
        res.status(responseData.status).json(responseData)
    },
    listPubliser: async (req, res) => {
        let responseData = await publisherServices.list()
        res.status(responseData.status).json(responseData)
    },
}