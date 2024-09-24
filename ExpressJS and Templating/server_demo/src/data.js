const fs = require('fs').promises;

async function readFile() {
    const data = JSON.parse((await fs.readFile('./product.json')).toString());

    return data;
}

async function getProducts() {
    const data = await readFile();

    return Object.entries(data).map(([id, item]) => Object.assign({}, item, { _id: id }));
}

async function getProductsById(id) {
    const data = await readFile();

    return data[id];
}

async function createProduct(product) {
    const data = await readFile();
    const _id = nextId();
    data[_id] = product;

    await fs.writeFile('./product.json', JSON.stringify(data, null, 2));
}

async function updateProduct(id, product) {
    const data = await readFile();
    data[id] = product;

    await fs.writeFile('./product.json', JSON.stringify(data, null, 2));

}

function nextId() {
    return 'xxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}

module.exports = {
    getProducts,
    createProduct,
    getProductsById,
    updateProduct
};