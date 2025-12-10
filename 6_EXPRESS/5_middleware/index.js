const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

const pathBase = path.join(__dirname, 'templates');

const checkAuth = function(req, res, next) {
    req.authStatus = true;

    if (req.authStatus) {
        console.log('Authorized!')
        next();
    } else {
        console.log('Unauthorized!');
        next();
    }
};

app.use(checkAuth)

app.get('/', (req, res) => {
    res.sendFile(`${pathBase}/index.html`);
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    console.log(`http://localhost:${port}`);
})