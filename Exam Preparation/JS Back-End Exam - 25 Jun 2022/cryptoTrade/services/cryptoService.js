const Crypto = require('../models/Crypto');

const getAll = async () =>  Crypto.find({}).lean();

const searchCrypto = async (name, payment) => {
    let crypto = await Crypto.find({
        name: { $regex: new RegExp(name, "i") },
    }).lean();
    crypto = crypto.filter((c) => c.payment == payment);
    return crypto;
}

const create = async (data) => Crypto.create(data);

const getById = async (id) => Crypto.findById(id).lean();

const update = async (id, data) => {
    const existing = await Crypto.findById(id);

    existing.name = data.name;
    existing.image = data.image;
    existing.price = data.price;
    existing.description = data.description;
    existing.payment = data.payment;

    existing.save();
};

const deleteById = async (id) => Crypto.findByIdAndDelete(id);

const buyCrypto = async (cryptoId, userId) => {
    const existing = await Crypto.findById(cryptoId);
    existing.buyers.push(userId);

    existing.save();
};

module.exports = {
    getAll,
    searchCrypto,
    create,
    getById,
    update,
    deleteById,
    buyCrypto
};