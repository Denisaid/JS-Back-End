const { getAll, getWishes } = require('../services/bookService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

homeController.get('/catalog', async (req, res) => {
  const books = await getAll();

  res.render('catalog', { title: 'Catalog Page', books });
});

homeController.get('/profile', async (req, res) => {
  const books = await getWishes(req.user._id);

  res.render('profile', { title: 'Profile Page', books });
});

module.exports = homeController;