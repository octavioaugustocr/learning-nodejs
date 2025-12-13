const express = require('express');
const app = express();
const path = require('path');
const conn = require('./db/conn');
const port = 3000;

const User = require('./models/UserModel');

const basePath = path.join(__dirname, './views');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);
});

conn.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
        console.log(`http://localhost:${port}`);
    });
}).catch((err) => console.log(err));