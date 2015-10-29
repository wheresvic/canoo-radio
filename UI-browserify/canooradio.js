var express = require('express');
var morgan = require('morgan');

var cors = require('./lib/cors.js');

var app = express();

app.use(morgan('dev'));

app.use(cors.allowAll);
app.use(express.static(__dirname + '/public'));

app.use(function (err, req, res, next) {

    logger.error(err + '');
    res.header('Error', err);
    res.status(500).send();

});

app.get('/api/playlist/played', function (req, res, next) {

    var playlist = [
        {
            id : '/var/mp3/snoop.mp3',
            artist : 'Snoop Dawg',
            song: 'Peaches N Cream',
            album: 'album',
            votes: 2
        },
        {
            id : '/var/mp3/cc.mp3',
            artist : 'Culcha Candela',
            song: 'Berlin city girl',
            album: 'album',
            votes: 4
        }
    ];

    res.send(playlist);

});

app.get('/api/playlist/upcoming', function (req, res, next) {

    var playlist = [
        {
            id : '/var/mp3/a.mp3',
            artist : 'Run DMC',
            song: 'It\'s tricky',
            album: 'album',
            votes: 2
        },
        {
            id : '/var/mp3/b.mp3',
            artist : 'Notorious B.I.G',
            song: 'Holla',
            album: 'album',
            votes: 4
        }
    ];

    res.send(playlist);

});

var app_http = app.listen(8000);
