const mongoose = require('mongoose');
require('../models/User');
require('../models/Recipe');

async function configDatabase() {
    const connectionString = 'mongodb://127.0.0.1:27017/homeCooking';
    await mongoose.connect(connectionString);

    console.log('Database Connected.');
}

module.exports = {
    configDatabase
};