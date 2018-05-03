//installed dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
//require config at folder config with database.js file... Declared the database location
const config = require('./config/database');

//connect to database from ./config/database.js
mongoose.connect(config.database);
//On Connection
mongoose.connection.on('connected', () =>{
    console.log('Connected to database '+config.database);
});

//check if error for database connection
mongoose.connection.on('error', (err) =>{
    console.log('Database error: '+err);
});

//Initialize "app" variable with express
const app = express();

//Initialize "user" variable for user routes
const users = require('./routes/users');


//Port Number
const port = process.env.PORT || 3000;

//****EXPRESS variable app

//use of Express CORS middleware
app.use(cors());

//SET Static folder file. All public view will be shown here
app.use(express.static(path.join(__dirname,'public')));
//Body Parser middleware
app.use(bodyParser.json());
//User Profile with variable users from /routes/users
app.use('/users',users);
//Index Route
app.get('/', (req,res) =>{
    res.send('Invalid Endpoint');
});
//Start Server
app.listen(port, () => console.log(`Server started on port ${port}`));
//****EXPRESS