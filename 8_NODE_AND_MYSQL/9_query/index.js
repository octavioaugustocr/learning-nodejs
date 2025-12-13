const express = require('express');
const app = express();
const pool = require('./db/conn');
const path = require('path');
const port = 3000;

const basePath = path.join(__dirname, './views');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);
});

app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';

    products =pool.query(sql, function(err, data) {
        if (err) {
            console.log(err);
        }

        res.json(data);
    });
});

app.post('/product/insertproduct', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const flavor = req.body.flavor;

    const sql = `INSERT INTO products (name, price, flavor) VALUES (?, ?, ?)`;
    const data = [name, price, flavor];

    pool.query(sql, data, function(err) {
        if (err) {
            console.log(err);
        }

        console.log('data inserts');
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    console.log(`http://localhost:${port}`);
});