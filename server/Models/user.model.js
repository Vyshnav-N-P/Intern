const {DataTypes} =require('sequelize');
const sequelize = require('../db');
const User=sequelize.define(
    'User',
    {
        username:{type: DataTypes.TEXT,allowNull:false,},
        password:{type: DataTypes.TEXT,allowNull:false,},
        userId:{type: DataTypes.INTEGER,allowNull:false,autoIncrement: true,primaryKey: true,},
        email:{type: DataTypes.TEXT,allowNull:false,unique:true,},
        Role:{type:DataTypes.TEXT,allowNull:false,defaultValue:'user'}
});
// (async () => {
//     try {
//         await User.sync();
//         console.log('User model synchronized with database');
//     } catch (error) {
//         console.error('Error synchronizing User model:', error);
//     }
// })();

module.exports={User};