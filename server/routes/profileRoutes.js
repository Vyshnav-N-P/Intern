const express=require('express');
const profilerouter=express.Router();
const { Profile } =require("../Models/userProfile.model.js");

profilerouter.post('/profile',(req,res)=>{
   try {
    const {userid} = req.params()
    const {img,dob} = req.body()
    const profile=Profile.create({userId:userid ,img:img ,dob:dob})
   } catch (error) {
    console.log(error);
   }
})

module.exports=profilerouter;