const { model, Schema, Types: { ObjectId } } = require('mongoose');


const itemSchema = new Schema({
    make: { type: String, required: [true, 'Make is required'] },
    model: { type: String, required: true },
    year: {
        type: Number,
        required: true,
        min: [1950, 'Year must be between 1950 and 2050'],
        max: [2050, 'Year must be between 1950 and 2050'],
    },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: [0.01, 'Price must be a positive number'] },
    img: { type: String, required: true },
    material: { type: String },
    _ownerId: { type: ObjectId, ref: 'User' }
});

const Item = model('Item', itemSchema);

module.exports = Item;