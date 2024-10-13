const volcanoController = require('../controllers/volcanoController');
const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');

module.exports = (app) => {
  app.use('/', homeController);
  app.use('/', authController);
  app.use('/volcano', volcanoController);
  app.use((req, res, next) => { res.render('404', { title: 'Error Page' }) });
};