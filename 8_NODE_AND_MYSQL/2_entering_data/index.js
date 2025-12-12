const express = require('express');
const app = express();
const mysql = require('mysql2');
const exphbs = require('express-handlebars');
const port = 3000;

const hbs = exphbs.create({
    partialsDir: ['views/partials']
});

const conn = mysql.createConnection({
    host: 'localhost',
    database: 'nodemysql1',
    user: 'root',
    password: ''
});

conn.connect(function(err) {
    if (err) {
        console.log(err);
    }

    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
        console.log(`http://localhost:${port}`);
    });
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title;
    const pageqty = req.body.pagesqty;

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;

    conn.query(sql, function(err) {
        if (err) {
            console.log(err);
        }

        res.redirect('/');
    });
});