var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Cart = require('../models/cart');

var csrfProtection = csrf();
router.use(csrfProtection);

router.use(express.static('public'))

router.get('/shopping-cart', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

// From Online
router.get('/checkout', function(req, res, next){ 
    if(!req.session.cart){ 
        return res.redirect('/account/shopping-cart', {products:null});
    } 
    var cart = new Cart(req.session.cart); 
    res.render('checkout', {total: cart.totalPrice, csrfToken: req.csrfToken()}); })

// My Route That was getting invalid xsrf token error
// router.get('/checkout', function(req, res, next) {
//     if (!req.session.cart) {
//         return res.redirect('/account/shopping-cart');
//     }
//     var cart = new Cart(req.session.cart);
//     res.render('checkout', {total: cart.totalPrice});
// });

router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile');
});

router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect('/');
})

router.use('/', notLoggedIn, function(req, res, next) {
    next();
})

router.get('/signup', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: 'profile',
    failureRedirect: 'signup',
    failureFlash: true
}));

router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: 'profile',
    failureRedirect: 'signin',
    failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
