const { Recipe } = require('../models/Recipe');

async function getRecent() {
  return Recipe.find().sort({ _id: -1 }).limit(3).lean();
}

async function getAll(search) {
  const query = {};

  if (search) {
    query.title = new RegExp(search, 'i');
  }

  return Recipe.find(query).lean()
}

async function getById(recipeId) {
  return Recipe.findById(recipeId).lean();
}

async function create(data, ownerId) {
  const record = new Recipe({
    title: data.title,
    ingredients: data.ingredients,
    instructions: data.instructions,
    description: data.description,
    image: data.image,
    owner: ownerId
  });

  await record.save();

  return record;
}

async function update(recipeId, data, userId) {
  const record = await Recipe.findById(recipeId);

  if (!record) {
    throw new ReferenceError('Record not found!' + recipeId);
  }

  if (record.owner.toString() != userId) {
    throw new Error('Access Denied!');
  }

  record.title = data.title;
  record.ingredients = data.ingredients;
  record.instructions = data.instructions;
  record.description = data.description;
  record.image = data.image;

  await record.save();

  return record;
}

async function deleteById(recipeId, userId) {
  const record = await Recipe.findById(recipeId);

  if (!record) {
    throw new ReferenceError('Record not found!' + recipeId);
  }

  if (record.owner.toString() != userId) {
    throw new Error('Access Denied!');
  }

  await Recipe.findByIdAndDelete(recipeId);
}

async function recommend(recipeId, userId) {
  const record = await Recipe.findById(recipeId);

  if (!record) {
    throw new ReferenceError('Record not found!' + recipeId);
  }

  if (record.owner.toString() == userId) {
    throw new Error('Access Denied!');
  }

  if (record.recommendList.find(l => l.toString() == userId)) {
    return;
  }

  record.recommendList.push(userId);

  await record.save();
}

module.exports = {
  getRecent,
  getAll,
  getById,
  update,
  deleteById,
  create,
  recommend
}