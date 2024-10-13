const mongoose = require('mongoose');

const CONNECTION_STRING = 'mongodb://localhost:27017/earthTreasureVaul';

module.exports = async (app) => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(CONNECTION_STRING);

    console.log('Database connected!');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};