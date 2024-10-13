const { hasUser } = require('../middlewares/guards');
const { getLastAnimal, getAll } = require('../services/animalService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const animals = await getLastAnimal();

    res.render('home', { title: 'Home Page', animals });
});

homeController.get('/catalog', async (req, res) => {
    const animals = await getAll();

    res.render('catalog', { title: 'Catalog Page', animals });
});

homeController.get('/search', async (req, res) => {
    const animals = await getAll(req.query.search);

    res.render('search', { title: 'Search Page', animals });
});

module.exports = homeController;