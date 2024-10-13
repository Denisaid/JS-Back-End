const { Schema, model, Types: { ObjectId } } = require('mongoose');

const artSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    technique: {
        type: String,
        required: [true, 'Technique is required']
    },
    picture: {
        type: String,
        required: true
    },
    certificate: {
        type: String,
        required: true
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    users: {
        type: [ObjectId],
        ref: 'User',
        default: [],
        required: true
    }
});


const Art = model('Art', artSchema);

module.exports = Art;