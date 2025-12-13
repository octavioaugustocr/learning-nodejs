const express = require('express');
const app = express();
const path = require('path');
const pool = require('./db/conn');
const port = 3000;

const basePath = path.join(__dirname, './views')

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);

    const sql = `SELECT * FROM products`;

    pool.query(sql, function(err, data) {
        if (err) {
            console.log();
        }

        const products = data;

        console.log(products);
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    console.log(`http://localhost:${port}`);
});