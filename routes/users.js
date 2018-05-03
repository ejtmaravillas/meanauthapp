//Users Routes

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');


//gets the model data needed for User from user.js from models folder
const User = require('../models/user');


//Register User with SCHEMAS
router.post('/register', (req, res, next) => {
    //set up newUser object with "User" Schemas from models folder
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    //add User with Schemas required fields from object newUser
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user'});
        }else{
            res.json({success: true, msg: 'User registered'});
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    res.send('Authenticate');
});
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});
//exports router
module.exports = router;