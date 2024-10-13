const stoneController = require('../controllers/stoneController');
const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');

module.exports = (app) => {
  app.use('/', homeController);
  app.use('/', authController);
  app.use('/stone', stoneController);
  app.use((req, res, next) => { res.render('404', { title: 'Error Page' }) });
};