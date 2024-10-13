const { Schema, model, Types } = require('mongoose');
const electronicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    damages: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    production: {
        type: Number,
        required: true
    },
    exploatation: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    buyingList: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Electronic = model('Electronic', electronicSchema);

module.exports = {
    Electronic
};