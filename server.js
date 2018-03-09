var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var tutorials = require('./routes/tutorials');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.use('/tutorials', tutorials);

app.get('/', function(req, res){
    res.render('home');
});

// app.get('/tutorials', function(req, res){
//     res.render('tutorials');
// });

app.get('/freelance', function(req, res){
    res.render('freelance');
});

app.get('/store', function(req, res){
    res.render('store');
});

var port = process.env.PORT || 3000;
  
app.listen(port, function () {
    console.log('Server listening at port', port);
}); 