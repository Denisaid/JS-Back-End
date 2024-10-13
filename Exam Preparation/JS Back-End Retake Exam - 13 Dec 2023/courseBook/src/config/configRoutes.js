const { homeController } = require('../controllers/homeController');
const { userController } = require('../controllers/userController');
const { courseController } = require('../controllers/courseController');

function configRoutes(app) {
    app.use(homeController);
    app.use(userController);
    app.use(courseController);
    app.get('*', (req, res) => {
        res.render('404');
    });
}

module.exports = {
    configRoutes
};