const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const port = 3000;

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {

    const items = ['a', 'b', 'c']

    res.render('home', { items });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    console.log(`http://localhost:${port}`);
});