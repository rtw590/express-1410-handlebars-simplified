var express = require('express');
var router = express.Router();
const Product = require('../models/product');

router.use(express.static('public'))


// router.get('/ninjas', function(req, res, next){
//     Ninja.aggregate().near({
//         near: { type: "Point", coordinates: [parseFloat(req.query.lng) , parseFloat(req.query.lat)] }, 
//         distanceField: "dist.calculated", 
//         maxDistance: 100000, 
//         spherical: true 
//         }).then(function(ninjas){ 
//             res.send(ninjas); 
//         }).catch(next); 
// });

router.get('/', function(req, res, next){
    var products = Product.findOne();
    console.log(products)
    res.render('store');
});

// add new product to database
router.post('/products', function(req, res, next){
    Product.create(req.body).then(function(product){
        res.send(product);
    }).catch(next);
});

// router.get('/:id', function(req, res){
//     res.render('store');
// });

module.exports = router;
