const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Users = sequelize.define('users',{
    uid:{
        type: DataTypes.INTEGER,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
})

module.exports = Users;