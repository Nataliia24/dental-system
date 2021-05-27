const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        const orders = await Order.find({user: req.user.id})
        res.status(200).json(orders)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req, res) {
    try {
        const order = await Order.findById(req.params.id)
        res.status(200).json(order)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Order.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Запис видалений!'
        })
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    const order = new Order({
        dateOfOrder: req.body.dateOfOrder,
        patient: req.body.patient,
        doctor: req.body.doctor,
        service: req.body.service,
        cost: req.body.cost,
        user: req.user.id
    })

    try {
        await order.save()
        res.status(201).json(order)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        const order = await Order.findOneAndUpdate(
            {_id: req.params.is},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(order)
    } catch(e) {
        errorHandler(res, e)
    }
}
