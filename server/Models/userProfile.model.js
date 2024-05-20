const {DataTypes} =require('sequelize');
const sequelize = require('../db');

const Profile=sequelize.define(
    'Profile',
    {
        userId:{type: DataTypes.INTEGER,allowNull:false,primaryKey: true,},
        img:{type: DataTypes.TEXT},
        dob:{type: DataTypes.DATE},
    }
);

module.exports= {Profile} ;