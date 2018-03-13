var express = require('express');
var router = express.Router();
const Product = require('../models/product');

router.use(express.static('public'))

router.get('/', function(req, res, next){
    Product.find(function(err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i+= chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('store', {title: 'Shopping Cart', products: productChunks});
    });
});

router.get('/:id', function(req, res){
    res.send('Yay route works!');
});

module.exports = router;
