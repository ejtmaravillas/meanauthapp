//Users Routes

const express = require('express');
const router = express.Router();

//Register route
router.get('/register', (req, res, next) => {
    res.send('REGISTER');
});

router.get('/authenticate', (req, res, next) => {
    res.send('Authenticate');
});
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

router.get('/validate', (req, res, next) => {
    res.send('VALIDATE');
});
//exports router
module.exports = router;