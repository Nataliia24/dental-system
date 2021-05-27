const Doctor = require('../models/Doctor')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        const doctors = await Doctor.find({user: req.user.id})
        res.status(200).json(doctors)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req, res) {
    try {
        const doctor = await Doctor.findById(req.params.id)
        res.status(200).json(doctor)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Doctor.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Лікар видалений!'
        })
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    const doctor = new Doctor({
        first_name: req.body.first_name,
        last_name: req.body.first_name,
        email: req.body.email,
        telNumber: req.body.telNumber,
        position: req.body.position,
        user: req.user.id,
    })

    try {
        await doctor.save()
        res.status(201).json(doctor)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
      const doctor = await Doctor.findOneAndUpdate(
          {_id: req.params.id},
          {$set: req.body},
          {new: true}
          )
          res.status(200).json(doctor)
    } catch(e) {
        errorHandler(res, e)
    }
}