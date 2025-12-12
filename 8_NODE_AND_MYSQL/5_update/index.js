const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mysql = require('mysql2');
const port = 3000;

const hbs = exphbs.create({ partialsDir: ['views/partials'] });

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
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    const sql = `SELECT * FROM books`;

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err);
        }

        const books = data;

        console.log(books);

        res.render('home', { books });
    });
});

app.get('/book/:id', (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM books WHERE id = ${id}`;

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err);
        }

        const book = data[0];

        res.render('book', { book });
    });
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM books WHERE id = ${id}`;

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err);
        }

        const book = data[0];

        res.render('editbook', { book });
    });
});

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `UPDATE books SET title = '${title}', pageqty = ${pageqty} WHERE id = ${id}`;

    conn.query(sql, function(err) {
        if (err) {
            console.log(err);
        }

        console.log(`UPDATE completed successfully!`);

        res.redirect('/');
    });
});