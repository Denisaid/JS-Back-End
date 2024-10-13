const { homeController } = require('../controllers/homeController');
const { userController } = require('../controllers/userController');
const { electronicsController } = require('../controllers/electronicsController');

function configRoutes(app) {
    app.use(homeController);
    app.use(userController);
    app.use(electronicsController);
    app.get('*', (req, res) => {
        res.render('404');
    });
}

module.exports = {
    configRoutes
};