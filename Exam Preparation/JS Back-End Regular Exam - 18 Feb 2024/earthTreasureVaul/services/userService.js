const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'q390vnodzmgszdfgsdz';

async function register(email, password) {
  const existing = await User.findOne({ email }).collation({
    locale: 'en',
    strength: 2
  });

  if (existing) {
    throw new Error('Email is taken!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword
  });

  const token = createSession(user);

  return token;
}

async function login(email, password) {
  const user = await User.findOne({ email }).collation({
    locale: 'en',
    strength: 2
  });
  if (!user) {
    throw new Error('Incorrect email or password');
  }

  const hasMatch = await bcrypt.compare(password, user.password);
  if (hasMatch == false) {
    throw new Error('Incorrect email or password!');
  }

  const token = createSession(user);
  return token;
}

function createSession({ _id, email }) {
  const payload = {
    _id,
    email
  };

  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  login,
  register,
  verifyToken,
};