var Tutorial = require('../models/tutorial');

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://user1:password1@ds111618.mlab.com:11618/14-10-store';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var tutorials = [
    new Tutorial({
        title: 'Flying Keys Tutorial',
        imgPath: 'images/keys.png',
        youtubeID: 'T0bygO6H9_A',
        shortDesc: 'In this tutorial we will model, texture, and animate flying keys.',
        longDesc: 'Follow Along And Make Your Own Flying Keys Animation!',
        filesNeeded1Title: 'Key Tutorial Files Found Above',
        filesNeeded1: '#',
        filesNeeded2Title: 'HDR Image - Barcelona Rooftops',
        filesNeeded2: 'http://www.hdrlabs.com/sibl/archive.html'
    }),
    new Tutorial({
        title: 'Top Plays Countdown Tutorial',
        imgPath: 'images/plays.png',
        youtubeID: 'Afek1MpEmCE',
        shortDesc: 'This tutorial will show you how to create a top plays countdown. We will work from start to finish in about 30 minutes.',
        longDesc: 'Follow Along And Make Your Own Top Plays Countdown Animation!',
        filesNeeded1Title: 'Wood Texture From Poliigon',
        filesNeeded1: 'https://www.poliigon.com/texture/wood-fine-dark-004',
        filesNeeded2Title: '(Optional): Completed Project Files Found Above',
        filesNeeded2: '#'
    }),
    new Tutorial({
        title: 'Realistic Clock Tutorial',
        imgPath: 'images/clock.png',
        youtubeID: 'AE-epbcu_GE',
        shortDesc: 'In this tutorial we model a clock and texture it. We also make the table and background for the scene.',
        longDesc: 'Follow Along And Make Your Own Clock Render!',
        filesNeeded1Title: 'Clock Tutorial Files Found Above',
        filesNeeded1: '#',
        filesNeeded2Title: 'Background Texture From textures.com',
        filesNeeded2: 'https://www.textures.com/download/paperdecorative0059/22355?q=PaperDecorative0059',
        filesNeeded3Title: 'Floor Texture From poliigon.com',
        filesNeeded3: 'https://www.poliigon.com/texture/2271',
        filesNeeded4Title: 'HDR Image - Barcelona Rooftops',
        filesNeeded4: 'http://www.hdrlabs.com/sibl/archive.html',
    })
];

var done = 0;
for (var i = 0; i < tutorials.length; i++) {
    tutorials[i].save(function(err, result) {
        if (done === tutorials.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}

