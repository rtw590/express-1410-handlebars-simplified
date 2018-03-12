var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create product Schema and Model
var ProductSchema = new Schema({
    title: {
        type: String
    },
    imagePath: {
        type: String
    }
});

var Product = mongoose.model('product', ProductSchema);

module.exports = Product;
