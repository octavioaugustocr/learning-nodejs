const express = require('express');
const app = express();
const port = 5000;

const projectsRoutes = require('./projects');

const path = require('path');
const basePath = path.join(__dirname, 'templates');

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use('/projects', projectsRoutes);

app.use(express.json());

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    console.log(`http://localhost:${port}`);
})