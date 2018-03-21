var express = require('express');
var router = express.Router();
const Product = require('../models/product');

router.use(express.static('public'))

router.get('/', function(req, res, next){
    var successMsg = req.flash('success')[0];
    Product.find(function(err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i+= chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('downloads', {title: 'Shopping Cart', products: productChunks, successMsg: successMsg, noMessages: !successMsg});
    });
});

// Get Single Product
router.get('/:id', function(req, res){
    Product.findById(req.params.id, function(err, product){
        res.render('product', {
            product: product
        });
    })
});


module.exports = router;
