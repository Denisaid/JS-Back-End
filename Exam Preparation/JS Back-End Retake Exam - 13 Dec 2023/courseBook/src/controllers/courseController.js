const { Router } = require('express');
const { create, getById, update, deleteById, signup } = require('../services/courseService');
const { body, validationResult } = require('express-validator');
const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util');

const courseController = Router();

courseController.get('/create', isUser(), async (req, res) => {
    res.render('create', { title: 'Create Page' });
})

courseController.post('/create', isUser(),
    body('title').trim().isLength({ min: 5 }).withMessage('Title should be at least 5 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('Image must be a valid URL start with http:// or https://'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description should be at least 10 characters long'),
    body('type').trim().isLength({ min: 3 }).withMessage('Type must be at least 3 characters long'),
    body('certificate').trim().isLength({ min: 2 }).withMessage('Certificate should be at least 2 characters long'),
    body('price').trim().isInt({ min: 0 }).withMessage('Price should be a positive number'),
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

courseController.get('/edit/:id', isUser(), async (req, res) => {
    const course = await getById(req.params.id);

    if (!course) {
        res.render('404');
    }

    const isOwner = req.user?._id == course.owner._id.toString();

    if (!isOwner) {
        res.redirect('/login');
        return;
    }

    res.render('edit', { title: 'Edit Page', data: course });
})

courseController.post('/edit/:id', isUser(),
body('title').trim().isLength({ min: 5 }).withMessage('Title should be at least 5 characters long'),
body('image').trim().isURL({ require_tld: false }).withMessage('Image must be a valid URL start with http:// or https://'),
body('description').trim().isLength({ min: 10 }).withMessage('Description should be at least 10 characters long'),
body('type').trim().isLength({ min: 3 }).withMessage('Type must be at least 3 characters long'),
body('certificate').trim().isLength({ min: 2 }).withMessage('Certificate should be at least 2 characters long'),
body('price').trim().isInt({ min: 0 }).withMessage('Price should be a positive number'),
    async (req, res) => {
        const courseId = req.params.id;
        const userId = req.user._id;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            await update(courseId, req.body, userId);
            res.redirect('/catalog/' + courseId);
        } catch (err) {
            res.render('create', { data: req.body, errors: parseError(err).errors });
        }
    }
);

courseController.get('/delete/:id', isUser(), async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user._id;

    try {
        await deleteById(courseId, userId);
        res.redirect('/catalog');
    } catch (err) {
        res.redirect('/catalog/' + courseId);
    }
});

courseController.get('/signup/:id', isUser(), async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user._id;

    try {
        await signup(courseId, userId);
        res.redirect('/catalog/' + courseId);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
});

module.exports = {
    courseController
};