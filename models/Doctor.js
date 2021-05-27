const mongoose = require('mongoose')
const Schema = mongoose.Schema

const doctorSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
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
    position: {
        type: String,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = Doctor = mongoose.model('Doctor', doctorSchema)