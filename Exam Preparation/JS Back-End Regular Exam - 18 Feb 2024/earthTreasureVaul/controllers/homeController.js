const { hasUser } = require('../middlewares/guards');
const { getLastStone, getAll } = require('../services/stoneService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const stones = await getLastStone();

    res.render('home', { title: 'Home Page', stones });
});

homeController.get('/catalog', async (req, res) => {
    const stones = await getAll();

    res.render('dashboard', { title: 'Catalog Page', stones });
});

homeController.get('/search', async (req, res) => {
    const stones = await getAll(req.query.search);

    res.render('search', { title: 'Search Page', stones });
});

module.exports = homeController;