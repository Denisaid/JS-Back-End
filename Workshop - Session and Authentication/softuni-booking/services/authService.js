const bcrypt = require('bcrypt');
const User = require('../models/User');

async function register(username, password) {
    const existing = await User.findOne({ username: { $regex: new RegExp(username), $options: 'i' } });

    if (existing) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        username,
        hashedPassword
    });

    return {
        _id: user._id,
        username,
        roles: user.roles
    }
}

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Incorect username or passowrd');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        throw new Error('Incorect username or passowrd');
    }

    return {
        _id: user._id,
        username: user.username,
        roles: user.roles
    }
}

module.exports = {
    register,
    login
};