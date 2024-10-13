const { Schema, model, Types: { ObjectId } } = require('mongoose');

const gameSchema = new Schema({
    name: {
        type: String,
        minLength:[4,'Name must be at least four characters']
    },
    image: {
        type: String,
        required: true,
        validate:{
            validator:value=>/https?:\/\/.+/.test(value),
            message:'Invalid image'
        }
    },
    price: {
        type: Number,
        minValue:[0,'Price must be a positive number']
    },
    description: {
        type: String,
        minLength:[10,'Description must be at least ten characters']
    },
    genre: {
        type: String,
        minLength:[2,'Genre must be at least two characters']
    },
    platform: {
        type: String,
        required: true,
        enum: {
            values: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
            message: 'Invalid platform'
        }
    },
    boughtBy: {
        type: [ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: ObjectId,
        ref: 'User',
    }
});

const Game = model('Game', gameSchema);

module.exports = Game;
