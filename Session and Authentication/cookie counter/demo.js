const express = require('express');

const app = express();

let visited = 0;
let id;

app.get('/', (req, res) => {
    if (req.headers.cookie) {
        const cookies = req.headers.cookie
            .split(';')
            .map(t => t.trim());
        console.log('>>>', cookies);
        const visitedCookie = cookies.find(t => t.includes('visited'));

        visited = Number(visitedCookie.split('=')[1]);
        visited++;
    }
    res.setHeader('Set-Cookie', `visited=${visited}; httpOnly`);
    // res.setHeader('Set-Cookie', 'theme=dark');
    res.send(`<p>Hello</p><p>You have visited this page ${visited} times</p>`);
});

app.listen(3000);