const { Router } = require('express');
const { getAll, getById, searchElectronic } = require('../services/electronics');

const homeController = Router();
homeController.get('/', async (req, res) => {
    res.render('home', { title: 'Home Page' });
});

homeController.get('/catalog', async (req, res) => {
    const electronics = await getAll();
    res.render('catalog', { title: 'Catalog Page', electronics });
});

homeController.get('/catalog/:id', async (req, res) => {
    const electronic = await getById(req.params.id);

    if (!electronic) {
        res.render('404');
        return;
    }

    const isOwner = req.user?._id == electronic.owner.toString();
    const hasBuyed = Boolean(electronic.buyingList.find(l => req.user?._id == l.toString()));

    res.render('details', { title: 'Details Page', electronic, isOwner, hasBuyed });
})

homeController.get('/search', async (req, res) => {
    const { name, type } = req.query;
    const electronics = await searchElectronic(name, type);

    res.render('search', { title: 'Search Page', electronics });
});

module.exports = {
    homeController
};