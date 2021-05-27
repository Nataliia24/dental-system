const Patient = require('../models/Patient')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
      const patients = await Patient.find({user: req.user.id})
      res.status(200).json(patients)
    } catch(e) {
        errorHandler(res, e)
    } 
}

module.exports.getById = async function(req, res) {
    try {
        const patient = await Patient.findById(req.params.id)
        res.status(200).json(patient)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Patient.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Пацієнт видалений'
        })
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    const patient = await new Patient({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dateOfBirth: req.body.dateOfBirth,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        email: req.body.email,
        telNumber: req.body.telNumber,
        user: req.user.id
    })
    try {
        await patient.save()
        res.status(201).json(patient)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        const patient = await Patient.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: tru}
        )
        res.status(200).json(patient)
    } catch(e) {
        errorHandler(res, e)
    }
}