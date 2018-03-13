var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Schema
var schema = new Schema({
    title: {
        type: String
    },
    imgPath: {
        type: String
    }
});

module.exports = mongoose.model('Product', schema);
