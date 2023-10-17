const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Users = sequelize.define('users',{
    uid:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    picture:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email_verified:{
        type: DataTypes.BOOLEAN,
    }
},{
    timestamps: false
})

module.exports = Users;