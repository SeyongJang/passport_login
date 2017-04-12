var express = require('express');
var passport = require('passport')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', isLoggedIn, function(req, res, next) {
    var userInfo = req.user;
    res.render('index', { title: 'You are logged in.', user:userInfo });
});

router.post('/signup', passport.authenticate('signup', {
    successRedirect : '/profile',
    failureRedirect : '/',
    failureFlash : true
}));

router.post('/login', passport.authenticate('login', {
    successRedirect : '/profile',
    failureRedirect : '/',
    failureFlash : true
}));

module.exports = router;

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login');
    }
}