const { Router } = require('express');
const { getRecent, getAll, getById } = require('../services/recipeService');

const homeController = Router();

homeController.get('/', async (req, res) => {
    const recipes = await getRecent();
    res.render('home', { title: 'Home Page', recipes });
});

homeController.get('/catalog', async (req, res) => {
    const recipes = await getAll();
    res.render('catalog', { title: 'Catalog Page', recipes });
});

homeController.get('/catalog/:id', async (req, res) => {
    const recipe = await getById(req.params.id);

    if (!recipe) {
        res.render('404');
        return;
    }

    const isOwner = req.user?._id == recipe.owner.toString();
    const hasRecommended = Boolean(recipe.recommendList.find(l => req.user?._id == l.toString()));
    const numberRecommends = recipe.recommendList.length;

    res.render('details', { title: 'Details Page', recipe, isOwner, hasRecommended, numberRecommends });
})

homeController.get('/search', async (req, res) => {
    const recipes = await getAll(req.query.search);

    res.render('search', { title: 'Search Page', recipes });
});

module.exports = {
    homeController
};