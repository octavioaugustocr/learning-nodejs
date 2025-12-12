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

const products = [
    {
        id: 1,
        name: 'Refrigerante de Guaraná Garrafa 2l',
        price: 8.99,
        flavor: 'Guaraná',
        mark: 'Guaraná',
        quantity_stock: 1200
    },
    {
        id: 2,
        name: 'Refrigerante de Laranja Garrafa 2l',
        price: 8.50,
        flavor: 'Laranja',
        mark: 'Fanta',
        quantity_stock: 760
    }
];

app.get('/', (req, res) => {
    res.render('home', { products });
});

app.get('/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    // const product = products[parseInt(req.params.id) - 1];

    res.render('product', { product });
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    console.log(`http://localhost:${port}`);
});