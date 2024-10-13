const Creature = require('../models/Creature');

const getAll = async () => Creature.find({}).lean();

const getById = async (creatureId) => Creature.findById(creatureId).populate('owner', 'firstName lastName').populate('votes', 'email').lean();

const create = async (data) => Creature.create(data);

const update = async (creatureId, data) => {
    const existing = await Creature.findById(creatureId);
    existing.name = data.name;
    existing.species = data.species;
    existing.skinColor = data.skinColor;
    existing.eyeColor = data.eyeColor;
    existing.image = data.image;
    existing.description = data.description;

    existing.save();
};

const deleteById = async (creatureId) => Creature.findByIdAndDelete(creatureId);

const giveVote = async (creatureId, userId) => {
    const existing = await Creature.findById(creatureId);
    existing.votes.push(userId);

    existing.save();
};

const getMyPost = async(userId) => Creature.find({ owner: userId }).populate('owner', 'firstName lastName').lean();

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    giveVote,
    getMyPost
};