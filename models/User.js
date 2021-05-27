const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    user: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String
    }
})

module.exports = User = mongoose.model('User', userSchema)