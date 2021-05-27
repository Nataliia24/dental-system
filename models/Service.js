const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = Service = mongoose.model('Service', serviceSchema)