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

router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

    Tutorial.findById(req.params.id, function(err, tutorial) {
        if (err) {
            console.log(err);
            return res.send('There was an error');
        }
        cart.add(tutorial, tutorial.id);
        res.session.cart = cart;
        console.log(req.session.cart)
        res.redirect('/')
    });
});

module.exports = router;
