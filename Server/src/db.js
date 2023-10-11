const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('clima', 'postgres', '/Barcoder123',{
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;