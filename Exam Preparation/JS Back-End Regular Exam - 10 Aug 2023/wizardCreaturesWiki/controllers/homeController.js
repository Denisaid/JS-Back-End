const homeController = require('express').Router();

const { hasUser } = require('../middlewares/guards');
const { getAll, getMyPost } = require('../services/creatureService');

homeController.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

homeController.get('/catalog', async (req, res) => {
    const creatures = await getAll();

    res.render('catalog', { title: 'Catalog Page', creatures });
});

homeController.get('/profile', hasUser(), async (req, res) => {
    const creatures = await getMyPost(req.user._id);
    console.log(creatures);

    res.render('my-posts', { title: 'Profile Page', creatures });
});

module.exports = homeController;