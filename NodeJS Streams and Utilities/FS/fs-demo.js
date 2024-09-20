const fs = require('fs').promises;

// const file = fs.readFileSync('./file.txt');
// console.log(file.toString());

// fs.readFile('./file.txt', (err, data) => {
//     console.log(data.toString());
// });

async function start() {
    const data = await fs.readFile('./file.txt');
    console.log(data.toString());
}

start();