
const { Sequelize,DataTypes } = require('sequelize');
const sequelize= new Sequelize('Angular','postgres','vyshnav7770',{
    dialect:'postgres',
    host:'localhost'
})

module.exports=sequelize;
