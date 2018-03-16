var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var tutorials = require('./routes/tutorials');
var downloads = require('./routes/downloads');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://user1:password1@ds111618.mlab.com:11618/14-10-store';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.use('/tutorials', tutorials);
app.use('/downloads', downloads);

app.get('/', function(req, res){
    res.render('home');
});

// app.get('/tutorials', function(req, res){
//     res.render('tutorials');
// });

app.get('/portfolio', function(req, res){
    res.render('portfolio');
});

app.get('/downloads', function(req, res){
    res.render('downloads');
});

var port = process.env.PORT || 3000;
  
app.listen(port, function () {
    console.log('Server listening at port', port);
}); 