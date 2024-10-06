const express = require('express');

const app = express();

const session = {};

function mySession(req, res, next) {
    const cookies = (req.headers.cookie || '')
        .split(';')
        .map(t => t.trim())
        .map(t => t.split('='))
        .reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

    console.log('>>>', cookies);

    let user = session[cookies.sessionId];

    if (user == undefined) {
        const newId = ('000000' + (Math.random() * 999999).toString(16)).slice(-6);
        user = { visited: 1 };
        session[newId] = user;
        res.setHeader('Set-Cookie', `sessionId=${newId}; httpOnly`);
    } else {
        user.visited++;
    }
    req.session = user;

    next();
}

app.use(mySession);

app.get('/', (req, res) => {

    res.send(`<p>Hello</p><p>You have visited this page ${req.session.visited} times</p>`);
});

app.listen(3000);