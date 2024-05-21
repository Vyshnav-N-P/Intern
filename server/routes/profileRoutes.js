const express=require('express');
const profilerouter=express.Router();
const { Profile } =require("../Models/userProfile.model.js");
const fs = require('fs');
const path = require('path');
const { where } = require('sequelize');
const { log } = require('console');

const uploadDirectory = path.join(__dirname, '..', 'src', 'assets', 'Uploads', 'Profile-Pictures');
const ensureDirectoryExistence = (directory) => {
   if (!fs.existsSync(directory)) {
     fs.mkdirSync(directory, { recursive: true });
   }
 };
profilerouter.post('/profile',async(req,res)=>{
   try {
    const {id,img,dob} = req.body;    
    let name =Date.now();
   const fileName = `${name}.txt`;
   const filePath = path.join(uploadDirectory, fileName);
   console.log(filePath);
   ensureDirectoryExistence(uploadDirectory);
   fs.writeFileSync(filePath,img, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      }
        console.log('File written successfully.');
      
    });

  

   let profile=await Profile.findOne({where:{userId:id}});
   if(!profile){
    profile=await Profile.create({userId:id, img:name ,dob:dob})
    res.status(201).send(profile);
   }
   else{
    await Profile.update({img:name,dob:dob},{where:{userId:id}});
   }

   } catch (error) {
    console.log(error);
   }
})

profilerouter.get('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findOne({ where: { userId: id } });

    if (profile) {
      const data = fs.readFileSync(`${uploadDirectory}/${profile.img}.txt`, 'utf8');
      res.status(200).send({data,profile});
    } else {
      res.status(404).send({ error: 'Profile not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while retrieving the profile.' });
  }
});

module.exports=profilerouter;