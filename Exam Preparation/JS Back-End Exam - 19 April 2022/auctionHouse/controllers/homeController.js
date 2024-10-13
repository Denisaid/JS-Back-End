const { getAll, getAllClosed } = require('../services/auctionService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

homeController.get('/catalog', async (req, res) => {
    res.render('catalog', { title: 'Catalog', auctions: await getAll() });
});

homeController.get('/closed-auctions', async (req, res) => {
    const auctions = await getAllClosed();

    res.render('closed-auctions', { title: 'Closed Auctions', auctions })
});

module.exports = homeController;