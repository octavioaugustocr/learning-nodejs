const express = require('express');
const app = express();
const conn = require('./db/conn');
const User = require('./models/UserModel');
const path = require('path');
const port = 3000;

const basePath = path.join(__dirname, './views');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);
});

app.get('/user/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({ raw: true, where: { id: id } });

    res.json(user);
});

conn.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
        console.log(`http://localhost:${port}`);
    });
}).catch((err) => console.log(err));