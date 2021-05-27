const Service = require('../models/Service')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        const services = await Service.find({user: req.user.id})
        res.status(200).json(services)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req, res) {
    try { 
        const service = await Service.findById(req.params.id)
        res.status(200).json(service)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Service.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Послуга видалена'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    const service = new Service({
        name: req.body.name,
        price: req.body.price,
        user: req.user.id
    })
    try {
        await service.save()
        res.status(201).json(service)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        const service = await Service.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
            )
        res.status(200).json(service)
    } catch (e) {
        errorHandler(res, e)
    }
}