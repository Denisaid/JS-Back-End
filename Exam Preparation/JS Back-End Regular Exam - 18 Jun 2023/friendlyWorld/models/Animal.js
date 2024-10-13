const { Schema, model, Types: { ObjectId } } = require("mongoose");

const animalSchema = new Schema({
    name: {
        type: String,
        minLength: [2, 'Name is required and must be at least 2 characters']
    },
    years: {
        type: Number,
        min: [1, 'Years are required and should be a number between 1 and  100'],
        max: [100, 'Years are required and should be a number between 1 and  100'],
    },
    kind: {
        type: String,
        minLength: [2, 'Kind is required and must be at least 3 characters']

    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: value => /^https?:\/\/.+/.test(value),
            message: 'Invalid image'
        }
    },
    need: {
        type: String,
        minLength: [3, 'Need is required and should be at least 3 and no longer than 20 characters'],
        maxLength: [20, 'Need is required and should be at least 3 and no longer than 20 characters']
    },
    location: {
        type: String,
        minLength: [5, 'Location is required and should be at least 5 and no longer than 15 characters'],
        maxLength: [15, 'Location is required and should be at least 5 and no longer than 15 characters']
    },
    description: {
        type: String,
        minLength: [5, 'Description is required and should be at least 5 and no longer than 50 characters'],
        maxLength: [50, 'Description is required and should be at least 5 and no longer than 50 characters']
    },
    donations: {
        type: [ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    }
});

const Animal = model("Animal", animalSchema);

module.exports = Animal;