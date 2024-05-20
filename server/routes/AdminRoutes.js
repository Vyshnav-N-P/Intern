const express=require('express');
const Adminrouter=express.Router();
const { User } = require("../Models/user.model.js");

Adminrouter.delete('/:id',async (req,res) =>{
    try {
        const {id}  = req.params;
        await User.destroy({where:{userId:id}});
        res.send({message: "Deleted"});
    } catch (error) {
        console.log(error.message);
    }
})


module.exports = Adminrouter;