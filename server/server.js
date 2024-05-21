const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./db.js"); 
const bodyParser = require("body-parser");
const routes=require("./routes/routes.js");
const cookieParser=require('cookie-parser');
const Adminroute = require("./routes/AdminRoutes.js");
const profilerouter = require("./routes/profileRoutes.js");

//USE
app.use(cors({
    credentials:true,
    origin: "http://localhost:4200",
}));
app.use(express.json({limit: '200mb'}));
app.use(bodyParser.json());


// Connect to the Sequelize database
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync()
        .then(() => 
        {
            console.log('Models synchronized successfully');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        console.error('Error synchronizing models:', error);
    }
})();

app.use(cookieParser())

//ROUTES
app.use('/',routes);
app.use('/remove',Adminroute);
app.use('/',profilerouter);

//Listeing to PORT 5000
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

// Google route for login
app.post('/api/login', (req, res) => { res.redirect('http://localhost:4200/match'); });

