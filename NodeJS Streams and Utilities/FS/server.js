const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    console.log('Request');
    if (req.method == 'GET') {
        // fs.readFile('./index.html', (err, data) => {
        //     res.write(data.toString());
        //     res.end();
        // });

        // const fileStream = fs.createReadStream('./index.html');
        // fileStream.on('data', chunk => {
        //     res.write(chunk);
        // });
        // fileStream.on('end', () => {
        //     res.end();
        // })

        fs.createReadStream('').pipe(res);
        
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