const { Router } = require('express');
const { getAll, getRecent, getById, getAllMyCreatedCourse, getAllMySignUpCourse } = require('../services/courseService');
const { isUser } = require('../middlewares/guards');

const homeController = Router();

homeController.get('/', async (req, res) => {
    const courses = await getRecent();
    res.render('home', { title: 'Home Page', courses });
});

homeController.get('/catalog', async (req, res) => {
    const courses = await getAll();
    res.render('catalog', { title: 'Catalog Page', courses });
});

homeController.get('/catalog/:id', async (req, res) => {
    const course = await getById(req.params.id);

    if (!course) {
        res.render('404');
        return;
    }
    course.logged = course.signUplist.map(l => l.username).join(', ');
    const isOwner = req.user?._id == course.owner._id.toString();
    const hasSignUp = Boolean(course.signUplist.find(l => req.user?._id == l._id.toString()));

    res.render('details', { title: 'Details Page', course, isOwner, hasSignUp });
})

homeController.get('/profile', isUser(), async (req, res) => {
    const userId = req.user?._id;
    const user = req.user?.email;

    const created = await getAllMyCreatedCourse(userId);
    const joined = await getAllMySignUpCourse(userId);

    res.render('profile', { title: 'Profile Page', user, created, joined });
});

module.exports = {
    homeController
};