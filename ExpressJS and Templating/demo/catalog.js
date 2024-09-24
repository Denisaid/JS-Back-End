const { Router } = require('express');

const router = Router();

router.get('/:productId', (req, res) => {
    console.log(req.params);
    res.send('Product Page');
});

router.get('/', (req, res) => {
    res.send('Catalog');
});

router.get('/:id/details', (req, res) => {
    console.log(req.params);
    res.send('Details Page');
});

router.get('/:category/:productId', (req, res) => {
    console.log(req.params);
    res.send('Product from category');
});

module.exports = router;