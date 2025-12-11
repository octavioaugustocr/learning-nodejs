const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const port = 3000;

const hbs = exphbs.create({
    partialsDir: ['views/partials']
});

app.engine('handlebars', hbs.engine);
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

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'Learn Node.Js',
            category: 'JavaScript',
            session: 112
        },
        {
            title: 'Learn C#',
            category: 'C#',
            session: 10
        },
        {
            title: 'Learn React',
            category: 'JavaScript',
            session: 0
        }
    ];

    res.render('blog', { posts });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    console.log(`http://localhost:${port}`);
});