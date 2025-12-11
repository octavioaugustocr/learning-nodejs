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
    res.render('home');
});

app.get('/post', (req, res) => {
    const post = {
        title: 'Learn Node.js',
        category: 'JavaScript',
        body: 'Lesson 111',
        comments: 4
    }

    res.render('blogpost', { post });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    console.log(`http://localhost:${port}`);
});