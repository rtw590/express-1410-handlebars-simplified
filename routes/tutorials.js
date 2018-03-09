var express = require('express');
var router = express.Router();

router.use(express.static('public'))

router.get('/', function(req, res){
    res.render('tutorials');
});

router.get('/blender-top-plays-countdown', function(req, res){
    res.render('top-plays');
});

router.get('/blender-clock-tutorial', function(req, res){
    res.render('blender-clock');
});

router.get('/blender-keys-tutorial', function(req, res){
    res.render('keys');
});

module.exports = router;
