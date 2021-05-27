const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    dateOfOrder: {
        type: Date,
        required: true
    },
    patient: {
        ref: 'patients',
        type: Schema.Types.Array
    },
    doctor: {
        ref: 'doctors',
        type: Schema.Types.Array
    },
    service: {
        ref: 'services',
        type: Schema.Types.Array
    }, 
    cost: {
        type: Number,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = Order = mongoose.model('Order', orderSchema)