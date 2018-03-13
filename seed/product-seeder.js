var Product = require('../models/product');

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://user1:password1@ds111618.mlab.com:11618/14-10-store';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var products = [
    new Product({
        title: 'Flying Keys Tutorial',
        imgPath: 'images/keys.png'
    }),
    new Product({
        title: 'Realistic Clock Tutorial',
        imgPath: 'images/keys.png'
    }),
    new Product({
        title: 'Top Plays Tutorial',
        imgPath: 'images/keys.png'
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}

