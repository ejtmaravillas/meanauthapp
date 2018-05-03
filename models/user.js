//Schemas for User Data
//USER DATA DETAILS and Database Storage

//for database communication
const mongoose = require('mongoose');
//bycrypt for password encryption
const bcrypt = require('bcryptjs');
//configuration file for database
const config = require('../config/database');

//User Schema for Mongoose (necessary fields for the User)
const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
//variable User created so it can be used outside this file (module.exports)
//User model with Schema UserSchema
const User = module.exports = mongoose.model('User',UserSchema);

//use models outside this file --- use module.exports.functionName
//UserID
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}
//UserName
module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

//addUser function used at User Register at users.js from routes folder
//newUser.save saves the newUser fields to the database
module.exports.addUser = function(newUser, callback){
    //generate "salt" for password encryption with 10 rounds
    bcrypt.genSalt(10, (err, salt) => {
        //hashed the salt with the user password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            //saved newUser field to the database
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = (candidatePassword, hash, callback) =>{
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}