const { homeController } = require('../controllers/homeController');
const { userController } = require('../controllers/userController');
const { recipeController } = require('../controllers/recipeController');

function configRoutes(app) {
    app.use(homeController);
    app.use(userController);
    app.use(recipeController);
    app.get('*', (req, res) => {
        res.render('404');
    });
}

module.exports = {
    configRoutes
};