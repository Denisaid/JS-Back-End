const { Router } = require('express');
const { login, register } = require('../services/userService');
const { isGuest } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator')
const { createToken } = require('../services/jwt');
const { parseError } = require('../util');

const userController = Router();

userController.get('/register', isGuest(), async (req, res) => {

    res.render('register', { title: 'Register Page' });
});

userController.post('/register', isGuest(),
    body('username').trim().isLength({ min: 2,max:20 }).withMessage('The username should be between 2 and 20 characters long'),
    body('email').trim().isEmail().isLength({ min: 10 }).withMessage('The email must be at least 10 character long'),
    body('password').trim().isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
    body('repass').trim().custom((value, { req }) => value == req.body.password).withMessage('Passwords don\'t match'),
    async (req, res) => {
        const { email, password, username } = req.body;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await register(email, password, username);
            const token = createToken(result);

            res.cookie('token', token);

            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.render('register', { data: { email, username }, errors: parseError(err).errors });
        }
    }
)

userController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

userController.get('/login', isGuest(), async (req, res) => {
    res.render('login', { title: 'Login Page' });
});

userController.post('/login', isGuest(),
    body('email').trim(),
    body('password').trim(),
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const result = await login(email, password);
            const token = createToken(result);

            res.cookie('token', token);

            res.redirect('/');
        } catch (err) {
            res.render('login', { data: { email }, errors: parseError(err).errors });
        }
    }
)

module.exports = {
    userController
};