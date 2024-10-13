const { Schema, model, Types: { ObjectId } } = require('mongoose');

const creatureSchema = new Schema({
    name: {
        type: String,
        minLength: [2, 'Name is required and must be at least 2 characters.']
    },
    species: {
        type: String,
        minLength: [3, 'Species is required and must be at least 3 characters.']
    },
    skinColor: {
        type: String,
        minLength: [3, 'Skin color is required and must be at least 3 characters.']
    },
    eyeColor: {
        type: String,
        minLength: [3, 'Eye color is required and must be at least 3 characters.']
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: value => /https?:\/\/.+/.test(value),
            message: 'Invalid image'
        }
    },
    description: {
        type: String,
        minLength: [5, 'Description is required and should be at least 5 and no longer than 500 characters.'],
        maxLength: [500, 'Description is required and should be at least 5 and no longer than 500 characters.']
    },
    votes: {
        type: [ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    }
});

const Creature = model('Creature', creatureSchema);

module.exports = Creature;