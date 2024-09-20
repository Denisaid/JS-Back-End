const http = require('http');

http.createServer((req, res) => {
    console.log('Request');
    if (req.method == 'GET') {
        res.write('OK');
        res.end();
    } else if (req.method == 'POST') {
        let body = '';
        req.on('data', data => {
            console.log('Chunk >>>', data.toString());
            body += data;
        });
        req.on('end', () => {
            console.log('Body', JSON.parse(body));
            const bodyAsObject = JSON.parse(body);
            bodyAsObject.price++;
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.write(JSON.stringify(bodyAsObject));
            res.end();
        })
    }
}).listen(3000);