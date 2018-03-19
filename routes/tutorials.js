var express = require('express');
var router = express.Router();
const Tutorial = require('../models/tutorial');
var Cart = require('../models/cart');

router.use(express.static('public'))

router.get('/', function(req, res, next){
    Tutorial.find(function(err, docs) {
        var tutorialChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i+= chunkSize) {
            tutorialChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('tutorials', {title: 'Tutorials', tutorials: tutorialChunks});
    });
});

// Get Single Tutorial
router.get('/:id', function(req, res){
    Tutorial.findById(req.params.id, function(err, tutorial){
        res.render('tutorial', {
            tutorial: tutorial
        });
    })
});


// First Attempt to work
router.get('/add-to-cart/:id', function(req, res, next) {
    var tutorialId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(req.body);
    console.log(req.body.PWYW);

    Tutorial.findById(tutorialId, function(err, tutorial) {
        if (err) {
            console.log(err);
            return res.send('There was an error');
        }
        cart.add(tutorial, tutorial.id);
        req.session.cart = cart;
        console.log(req.session.cart)
        res.redirect('/')
    });
});

// Second Attempt to work
router.post('/add-to-cart/:id', function(req, res, next) {
    var tutorialId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var PWYW = parseInt(req.body.PWYW);

    Tutorial.findById(tutorialId, function(err, tutorial) {
        if (err) {
            console.log(err);
            return res.send('There was an error');
        }
        cart.add(tutorial, tutorial.id, PWYW);
        req.session.cart = cart;
        console.log(req.session.cart)
        res.redirect('/')
    });
});

module.exports = router;
