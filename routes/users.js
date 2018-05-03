//Users Routes

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//gets the model data needed for User from user.js from models folder
const User = require('../models/user');

//TESTING
//used postman chrome for data handling and saving to database with UserSchema
//called global function addUser from models/user file.
//encrypted the password using bcrypt
//save newUser to the database

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
    //User == mongoose model with UserSchema fields
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user'});
        }else{
            res.json({success: true, msg: 'User registered'});
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({success:false, msg:'User not Found.'});
        
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 604800 // 1 week in seconds
                });

                res.json({
                    success: true,
                    token: 'Bearer ${token}',
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }else {
                return res.json({success:false, msg:'Wrong Password.'});
            }
        });
    });
});
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});
//exports router
module.exports = router;