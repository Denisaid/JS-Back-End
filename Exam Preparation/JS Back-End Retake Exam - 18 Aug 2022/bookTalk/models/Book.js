const { Schema, model, Types: { ObjectId } } = require("mongoose");

const bookSchema = new Schema({
    title: {
        type: String,
        minLength: [2, 'Title must be at least 2 characters']
    },
    author: {
        type: String,
        minLength: [5, 'Author must be at least 5 characters']
    },
    image: {
        type: String,
        validate: {
            validator: value => /https?:\/\/.+/.test(value),
            message: 'Invalid image'
        }
    },
    review: {
        type: String,
        minLength: [10, 'Review must be at least 2 characters']
    },
    genre: {
        type: String,
        minLength: [3, 'Genre must be at least 3 characters']
    },
    stars: {
        type: Number,
        min: [1, 'Stars should be a positive number between 1 and 5'],
        max: [5, 'Stars should be a positive number between 1 and 5']
    },
    wishingList: {
        type: [ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    }
});

const Book = model("Book", bookSchema);

module.exports = Book;