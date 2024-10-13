const { Router } = require('express');
const { create, getById, update, deleteById, recommend } = require('../services/recipeService');
const { body, validationResult } = require('express-validator');
const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util');

const recipeController = Router()

recipeController.get('/create', isUser(), async (req, res) => {
    res.render('create', { title: 'Create Page' });
})

recipeController.post('/create', isUser(),
    body('title').trim().isLength({ min: 2 }).withMessage('The title should be at least 2 characters long'),
    body('description').trim().isLength({ min: 10, max: 100 }).withMessage('The Description should be between 10 and 100 characters long'),
    body('ingredients').trim().isLength({ min: 10, max: 200 }).withMessage('The ingredients should be between 10 and 200 characters long'),
    body('instructions').trim().isLength({ min: 10 }).withMessage('The instructions should be at least 10 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('The Image should start with http:// or https://'),
    async (req, res) => {

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            await create(req.body, req.user._id);
            res.redirect('/catalog');
        } catch (err) {
            res.render('create', { data: req.body, errors: parseError(err).errors });
        }
    }
);

recipeController.get('/edit/:id', isUser(), async (req, res) => {
    const recipe = await getById(req.params.id);

    if (!recipe) {
        res.render('404');
    }

    const isOwner = req.user?._id == recipe.owner.toString();

    if (!isOwner) {
        res.redirect('/login');
        return;
    }

    res.render('edit', { title: 'Edit Page', data: recipe });
})

recipeController.post('/edit/:id', isUser(),
    body('title').trim().isLength({ min: 2 }).withMessage('The title should be at least 2 characters long'),
    body('description').trim().isLength({ min: 10, max: 100 }).withMessage('The Description should be between 10 and 100 characters long'),
    body('ingredients').trim().isLength({ min: 10, max: 200 }).withMessage('The ingredients should be between 10 and 200 characters long'),
    body('instructions').trim().isLength({ min: 10 }).withMessage('The instructions should be at least 10 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('The Image should start with http:// or https://'),
    async (req, res) => {
        const recipeId = req.params.id;
        const userId = req.user._id;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            ; await update(recipeId, req.body, userId);
            res.redirect('/catalog/' + recipeId);
        } catch (err) {
            res.render('create', { data: req.body, errors: parseError(err).errors });
        }
    }
);

recipeController.get('/delete/:id', isUser(), async (req, res) => {
    const recipeId = req.params.id;
    const userId = req.user._id;

    try {
        await deleteById(recipeId, userId);
        res.redirect('/catalog');
    } catch (err) {
        res.redirect('/catalog/' + recipeId);
    }
});

recipeController.get('/recommend/:id', isUser(), async (req, res) => {
    const recipeId = req.params.id;
    const userId = req.user._id;

    try {
        await recommend(recipeId, userId);
        res.redirect('/catalog/' + recipeId);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
});

module.exports = {
    recipeController
};