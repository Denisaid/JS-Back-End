const { Course } = require('../models/Course');

async function getAll() {
  return Course.find().lean();
}

async function getById(courseId) {
  return Course.findById(courseId).populate('signUplist','username').populate('owner','email').lean();
}

function getRecent() {
  return Course.find().sort({ _id: -1 }).limit(3).lean();
}

async function create(data, ownerId) {
  const record = new Course({
    title: data.title,
    type: data.type,
    certificate: data.certificate,
    image: data.image,
    description: data.description,
    price: data.price,
    owner: ownerId
  });

  await record.save();

  return record;
}

async function update(courseId, data, userId) {
  const record = await Course.findById(courseId);

  if (!record) {
    throw new ReferenceError('Record not found!' + courseId);
  }

  if (record.owner.toString() != userId) {
    throw new Error('Access Denied!');
  }

  record.title = data.title;
  record.type = data.type;
  record.certificate = data.certificate;
  record.image = data.image;
  record.description = data.description;
  record.price = data.price;

  await record.save();

  return record;
}

async function deleteById(courseId, userId) {
  const record = await Course.findById(courseId);

  if (!record) {
    throw new ReferenceError('Record not found!' + courseId);
  }

  if (record.owner.toString() != userId) {
    throw new Error('Access Denied!');
  }

  await Course.findByIdAndDelete(courseId);
}

async function signup(courseId, userId) {
  const record = await Course.findById(courseId);

  if (!record) {
    throw new ReferenceError('Record not found!' + courseId);
  }

  if (record.owner.toString() == userId) {
    throw new Error('Access Denied!');
  }

  if (record.signUplist.find(l => l.toString() == userId)) {
    return;
  }

  record.signUplist.push(userId);

  await record.save();
}

async function getAllMyCreatedCourse(userId) {
  return Course.find({ owner: userId }).lean();
}

async function getAllMySignUpCourse(userId) {
  return Course.find({ signUplist: userId }).lean();
}

module.exports = {
  getAll,
  getById,
  update,
  deleteById,
  create,
  getRecent,
  signup,
  getAllMyCreatedCourse,
  getAllMySignUpCourse
}