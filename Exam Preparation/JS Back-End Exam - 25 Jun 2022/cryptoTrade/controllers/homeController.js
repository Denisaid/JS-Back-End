const { getAll, searchCrypto } = require('../services/cryptoService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

homeController.get('/catalog', async (req, res) => {
    const crypto = await getAll();

    res.render('catalog', { title: 'Catalog', crypto });
});

homeController.get("/search", async (req, res) => {
    let crypto = await getAll();
    res.render("search", { crypto });
  });

homeController.post('/search', async (req, res) => {
    let { name, payment } = req.body;
    let crypto = await searchCrypto(name, payment);
    res.render("search", { crypto });
});

module.exports = homeController;