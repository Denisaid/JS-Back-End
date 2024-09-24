const express = require('express');

const logger = require('./logger');
const CatalogController = require('./catalog');
const { isAsdmin } = require('./auth');

const app = express();

app.use('/content', express.static('public'));
app.use(logger);

app.use('/catalog', CatalogController);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/getOrder', (req, res) => {
    res.download(__dirname + '/demo.pdf');
});

app.get('/create', isAsdmin, (req, res) => {
    res.send('<form method="POST"><label>Name:<input name="name"></label><button>Send</button></form>');
});

app.post('/create', (req, res) => {
    res.status(201).json({
        _id: '1234qwer',
        name: 'Product 1',
        price: 53
    });
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/contact', (req, res) => {
    res.redirect('/about');
});

app.all('*', (req, res) => {
    res.send('404 Custom Not Found Page');
});

app.listen(3000);