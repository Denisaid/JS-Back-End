const { Schema, model } = require('mongoose');

const carSchema = Schema({
    name: {
        type: String,
        required: [true, 'Car listing must have a name!']
    },
    price: {
        type: Number,
        default: 5000,
        min: [0, 'Price connot be negative! Attempted to set price {VALUE}']
        // validate: {
        //     validator: function (value) {
        //         return value >= 0;
        //     },
        //     message: 'Price connot be negative!'
        // }
    },
});

carSchema.methods.startEngine = function () {
    console.log(`${this.name} goes Vroooom!`);
};

carSchema.virtual('VAT').get(function () {
    return this.price * 0.20;
});

// carSchema.path('price').validate(function (value) {
//     return value >= 0;
// }, 'Price connot be negative!');

const Car = model('Car', carSchema);

module.exports = Car;