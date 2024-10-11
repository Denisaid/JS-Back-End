const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { mapError } = require('../services/util');

const router = Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register',
    body('username')
        .trim()
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long!')
        .isAlphanumeric().withMessage('Username may contain only alphanumeric characters!'),
    body('password')
        .trim()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long!')
        .isAlphanumeric().withMessage('Password may contain only alphanumeric characters!'),
    body('repeatPassword')
        .trim()
        .custom((value, { req }) => value == req.body.password).withMessage('Password don\'t match!'),
    async (req, res) => {
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw errors;
            }
            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/');
        } catch (err) {
            res.locals.errors = mapError(err);
            res.render('register', { title: 'Register', data: { username: req.body.username } });
        }
    });

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
    try {
        await req.auth.login(req.body.username, req.body.password);
        res.redirect('/');
    } catch (err) {
        res.locals.errors = [{ msg: err.message }];
        console.error(err.message);
        res.render('login', { title: 'Login' });
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;