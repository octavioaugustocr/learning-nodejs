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

app.get('/user/add', (req, res) => {
    res.sendFile(`${basePath}/addUser.html`);
});

app.post('/user/add', async (req, res) => {
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    await User.create({ name, occupation, newsletter });

    res.sendFile(`${basePath}/index.html`);
});

conn.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
        console.log(`http://localhost:${port}`);
    });
}).catch((err) => console.log(err));