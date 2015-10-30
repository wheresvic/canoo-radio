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
            votes: 40
        },
        {
            id : '/var/mp3/dd.mp3',
            artist : 'dd',
            song: 'dd',
            album: 'album',
            votes: 7
        },
        {
            id : '/var/mp3/ee.mp3',
            artist : 'ee',
            song: 'ee',
            album: 'album',
            votes: 1000
        },
        {
            id : '/var/mp3/ff.mp3',
            artist : 'ff',
            song: 'ff',
            album: 'album',
            votes: 4
        },
        {
            id : '/var/mp3/gg.mp3',
            artist : 'gg',
            song: 'gg',
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

})

app.get('/api/playlist/current', function (req, res, next) {

    var playlist = {
        id : '/var/mp3/current.mp3',
        artist : 'Current',
        song: 'current',
        album: 'album',
        votes: 2
    };

    res.send(playlist);

});

app.get('/api/user/:id', function (req, res, next) {

    var user = {
        id: req.params.id,
        votes : {
            "01 Welcome.mp3" : 1,
            "04 Pretty Fly (For a White Guy).mp3" : 1,
            "05 The Kids Aren't Alright.mp3" : -1
        }
    };

    res.send(user);

});


app.get('/api/vote/up', function (req, res, next) {

    var data = req.body;

    console.log(data);

    res.status(200).send();

});


app.get('/api/vote/down', function (req, res, next) {

    var data = req.body;

    console.log(data);

    res.status(200).send();

});

app.get('/api/vote/clear', function (req, res, next) {

    var data = req.body;

    console.log(data);

    res.status(200).send();

});

app.get('/api/search', function (req, res) {

    console.log(req.query);

    var songs = [
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
            votes: 40
        },
        {
            id : '/var/mp3/dd.mp3',
            artist : 'dd',
            song: 'dd',
            album: 'album',
            votes: 7
        },
        {
            id : '/var/mp3/ee.mp3',
            artist : 'ee',
            song: 'ee',
            album: 'album',
            votes: 1000
        },
        {
            id : '/var/mp3/ff.mp3',
            artist : 'ff',
            song: 'ff',
            album: 'album',
            votes: 4
        },
        {
            id : '/var/mp3/gg.mp3',
            artist : 'gg',
            song: 'gg',
            album: 'album',
            votes: 4
        }
    ];

    if(req.query.q !== "") {
        res.send([songs[0]]);
    } else {
        res.send(songs);
    }

});

app.get('/api/addSong', function (req, res, next) {

    var data = req.query;

    console.log(data);

    res.status(200).send();

});

var app_http = app.listen(8000);
