const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('stock_control', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connected with success!');
} catch(err) {
    console.log(err);
}

module.exports = sequelize;