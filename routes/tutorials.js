var express = require('express');
var router = express.Router();
const Tutorial = require('../models/tutorial');

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

module.exports = router;
