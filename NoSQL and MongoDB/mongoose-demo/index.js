const mongoose = require('mongoose');

const Car = require('./models/Car');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/movies');

    console.log('Database connected');

    // try {
    //     const car = await new Car({
    //         name: 'Opel Vectra',
    //         price: -100
    //     });

    //     await car.save();
    // } catch (err) {
    //     console.log(err.message);
    // }

    console.log(await Car.find({}).sort({ price: -1 }));

    const data = await Car.find({ price: { $gte: 5000, $lte: 23000 } });
    console.log(data);
    data.forEach(car => car.startEngine());
    data.forEach(car => console.log(car.VAT));

    await Car.findByIdAndUpdate('64ee3721e919e622ee8df530', { price: 22000 });
}

main();