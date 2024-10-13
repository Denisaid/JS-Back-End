const Game = require('../models/Game');

const getAll = async () => Game.find({}).lean();

const getById = async (gameId) => Game.findById(gameId).lean();

const create = async (data) => Game.create(data);

const update = async (gameId, data) => {
    const existing = await Game.findById(gameId);

    existing.platform = data.platform;
    existing.name = data.name;
    existing.image = data.image;
    existing.price = data.price;
    existing.genre = data.genre;
    existing.description = data.description;

    existing.save();
};

const deleteById = async (gameId) => Game.findByIdAndDelete(gameId);

const buyGame = async (gameId, userId) => {
    const existing = await Game.findById(gameId);
    existing.boughtBy.push(userId);

    existing.save();
};

const searchGame = async (name, platform) => {
    let games = await getAll();

    if(name){
        games = await Game.find({name: { $regex: new RegExp(name, "i") }}).lean();
    }
    if(platform){
        games = games.filter(x => x.platform == platform);
    }

    return games;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    buyGame,
    searchGame
};