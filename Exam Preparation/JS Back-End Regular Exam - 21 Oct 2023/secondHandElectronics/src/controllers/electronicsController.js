const { Router } = require('express');
const { create, getById, update, deleteById, buy } = require('../services/electronics');
const { body, validationResult } = require('express-validator');
const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util');

const electronicsController = Router()

electronicsController.get('/create', isUser(), async (req, res) => {
    res.render('create', { title: 'Create Page' });
})

electronicsController.post('/create', isUser(),
    body('name').trim().isLength({ min: 10 }).withMessage('Name should be at least 10 characters long'),
    body('type').trim().isLength({ min: 2 }).withMessage('Type must be at least 2 characters long'),
    body('damages').trim().isLength({ min: 0 }).withMessage('Damages should be at least 10 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('Electronic\'s image must be a valid URL'),
    body('description').trim().isLength({ min: 10, max: 200 }).withMessage('Description should be between 10 and 200'),
    body('production').trim().isInt({ min: 1900, max: 2023 }).withMessage('Production should be between 1900 and 2023'),
    body('exploatation').trim().isInt({ min: 0 }).withMessage('Exploatation must to be a positive number'),
    body('price').trim().isInt({ min: 0 }).withMessage('Price must to be a positive number'),
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

electronicsController.get('/edit/:id', isUser(), async (req, res) => {
    const fetchData = await getById(req.params.id);

    if (!fetchData) {
        res.render('404');
    }

    const isOwner = req.user?._id == fetchData.owner.toString();

    if (!isOwner) {
        res.redirect('/login');
        return;
    }

    res.render('edit', { title: 'Edit Page', data: fetchData });
})

electronicsController.post('/edit/:id', isUser(),
    body('name').trim().isLength({ min: 10 }).withMessage('Name should be at least 10 characters long'),
    body('type').trim().isLength({ min: 2 }).withMessage('Type must be at least 2 characters long'),
    body('damages').trim().isLength({ min: 0 }).withMessage('Damages should be at least 10 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('Electronic\'s image must be a valid URL'),
    body('description').trim().isLength({ min: 10, max: 200 }).withMessage('Description should be between 10 and 200'),
    body('production').trim().isInt({ min: 1900, max: 2023 }).withMessage('Production should be between 1900 and 2023'),
    body('exploatation').trim().isInt({ min: 0 }).withMessage('Exploatation must to be a positive number'),
    body('price').trim().isInt({ min: 0 }).withMessage('Price must to be a positive number'),
    async (req, res) => {
        const electronicId = req.params.id;
        const userId = req.user._id;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            await update(electronicId, req.body, userId);
            res.redirect('/catalog/' + electronicId);
        } catch (err) {
            res.render('create', { data: req.body, errors: parseError(err).errors });
        }
    }
);

electronicsController.get('/delete/:id', isUser(), async (req, res) => {
    const electronicId = req.params.id;
    const userId = req.user._id;

    try {
        await deleteById(electronicId, userId);
        res.redirect('/catalog');
    } catch (err) {
        res.redirect('/catalog/' + electronicId);
    }
});

electronicsController.get('/buy/:id', isUser(), async (req, res) => {
    const electronicId = req.params.id;
    const userId = req.user._id;

    try {
        await buy(electronicId, userId);
        res.redirect('/catalog/' + electronicId);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
});

module.exports = {
    electronicsController
};