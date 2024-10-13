const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');
const homeController = require('../controllers/homeController');

module.exports = (app) => {
  app.use('/', homeController);
  app.use('/auth', authController);
  app.use('/book', bookController);
  app.use((req, res, next) => {
    res.render('404', { title: 'Error Page' })
  });
};