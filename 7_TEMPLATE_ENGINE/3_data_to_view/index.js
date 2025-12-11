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
    const user = {
        name: "Octávio",
        surname: "Augusto"
    }

    const aka = 'taviok1ng'

    res.render('home', { user: user, aka });
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    console.log(`http://localhost:${port}`);
})