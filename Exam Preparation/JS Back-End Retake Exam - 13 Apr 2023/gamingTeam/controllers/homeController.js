const { getAll, searchGame } = require('../services/gameService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', idStyle: 'home' });
});

homeController.get('/catalog', async (req, res) => {
    const games = await getAll();

    res.render('catalog', { title: 'Catalog Page', idStyle: 'catalog', games });
});

homeController.get('/search', async (req, res) => {
    const { name, platform } = req.query;
    const games = await searchGame(name, platform);

    res.render('search', { title: 'Search Page', idStyle: 'search', games });
});

module.exports = homeController;