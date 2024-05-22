const express = require("express");
const router = express.Router();
const { User } = require("../Models/user.model.js");
const jwt = require('jsonwebtoken');
const { log } = require("console");
const { Op } = require("sequelize");

router.get('/listusers', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = await User.create({
            username: username,
            password: password,
            email: email,
        });
        res.status(201).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username: username, password: password } });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // Web token
        const token = jwt.sign({ id: user.userId }, "secret");

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.json({user,token});
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies.jwt;
        const claims = jwt.verify(cookie, 'secret');
        if (!cookie) {
            return res.status(401).send({ message: "No token provided" });
        }
        if (!claims) {
            return res.status(401).send({ message: "Invalid token" });
        }

        const user = await User.findOne({ where: { userId: claims.id } });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.send(user);
    } catch (error) {
        console.error(error);
        if (error.name === 'JsonWebTokenError') {
            res.status(401).send({ message: "Invalid token" });
        } else if (error.name === 'SequelizeDatabaseError') {
            res.status(500).send({ message: "Database error" });
        } else {
            res.status(500).send({ message: "Internal server error" });
        }
    }
});

router.post('/logout', async (req, res) => {
    try {

        res.clearCookie('jwt');    
        // Send response
        res.send({
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).send({
            message: "Error occurred during logout"
        });
    }
});

router.delete('/remove/:id',async (req,res) =>{
    try {
        const {id}  = req.params;
        await User.destroy({where:{userId:id}});
        res.send({message: "Deleted"});
    } catch (error) {
        console.log(error.message);
    }
})

router.get('/search/:search',async (req,res)=>{
    try{
        const {search} = req.params;
        console.log(search);
        const users = await User.findAll({where:{username:{[Op.iLike]:`%${search}%`}}});
        console.log(users);
        res.status(200).send(users);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;
