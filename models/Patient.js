const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        rquired: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telNumber: {
        type: String,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = Patient = mongoose.model('Patient', patientSchema)