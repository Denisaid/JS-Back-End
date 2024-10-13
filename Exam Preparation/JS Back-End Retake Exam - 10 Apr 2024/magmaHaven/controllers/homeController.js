const { getAll, searchVolcano } = require('../services/volcanoService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    res.render('home', { title: 'Home Page' });
});

homeController.get('/catalog', async (req, res) => {
    const volcanos = await getAll();

    res.render('dashboard', { title: 'Catalog Page', volcanos });
});

homeController.get('/search', async (req, res) => {
    const { name, typeVolcano } = req.query;
    const volcanos = await searchVolcano(name, typeVolcano);

    res.render('search', { title: 'Search Page',volcanos });
});

module.exports = homeController;