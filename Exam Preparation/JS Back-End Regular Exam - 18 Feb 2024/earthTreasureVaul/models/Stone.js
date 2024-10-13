const { Schema, model, Types: { ObjectId } } = require('mongoose');

const stoneSchema = new Schema({
    name: {
        type: String,
        minLength: [2, 'Name is required and must be at least 2 characters']
    },
    category: {
        type: String,
        min: [3, 'Category is required and must be be at least 3 characters'],
    },
    color: {
        type: String,
        minLength: [2, 'Color is required and must be at least 2 characters']
    },
    image: {
        type: String,
        validate: {
            validator: value => /^https?:\/\/.+/.test(value),
            message: 'Invalid image. Image should start with http:// or https://'
        }
    },
    location: {
        type: String,
        minLength: [5, 'Location is required and should be at least 5 and no longer than 15 characters'],
        maxLength: [15, 'Location is required and should be at least 5 and no longer than 15 characters']
    },
    formula: {
        type: String,
        minLength: [3, 'Formula is required and should be at least 3 and no longer than 30 characters'],
        maxLength: [30, 'Formula is required and should be at least 3 and no longer than 30 characters']
    },
    description: {
        type: String,
        minLength: [10, 'Description is required and must be at least 10 characters']
    },
    likedList: {
        type: [ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    }
});

const Stone = model('Stone', stoneSchema);

module.exports = Stone;