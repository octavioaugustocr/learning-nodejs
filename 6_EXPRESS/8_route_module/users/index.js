const express = require('express');
const router = express.Router();

const path = require('path');
const basePath = path.join(__dirname, '../templates');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Searching user by ID: ${id}`);
    res.sendFile(`${basePath}/userform.html`)
});

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
});

router.post('/save', (req, res) => {
    console.log(req.body)

    const name = req.body.name;
    const age = req.body.age;

    console.log(`The username is ${name} and he is ${age} yearls old.`);

    res.sendFile(`${basePath}/userform.html`);
});

module.exports = router;