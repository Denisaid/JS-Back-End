const { Schema, model, Types: { ObjectId } } = require('mongoose');

const volcanoSchema = new Schema({
    name: {
        type: String,
        minLength: [2, 'Name is required and must be at least 2 characters']
    },
    location: {
        type: String,
        minLength: [3, 'Location is required and must be at least 3 characters']
    },
    elevation: {
        type: Number,
        min:[0,'Elevation must be a positive number']
    },
    lastEruption: {
        type: Number,
        min:[0,'The Year of Last Eruption should be between 0 and 2024'],
        max:[2024,'The Year of Last Eruption should be between 0 and 2024']
    },
    image: {
        type: String,
        validate: {
            validator: value => /^https?:\/\/.+/.test(value),
            message: 'Invalid image. Image should start with http:// or https://'
        }
    },
    typeVolcano: {
        type: String,
        required: true,
        enum: {
            values: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'],
            message: 'Invalid type'
        }
    },
    description: {
        type: String,
        minLength: [10, 'Description is required and must be at least 10 characters']
    },
    voteList: {
        type: [ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    }
});

const Volcano = model('Volcano', volcanoSchema);

module.exports = Volcano;