var express = require('express');
var morgan = require('morgan');
var Promise = require('bluebird');

var cors = require('./lib/cors.js');
var logger = require('./lib/logger.js').logger;
var mpdWrapper = require('./lib/mpd-wrapper')('localhost', 6600, logger);
var dbWrapper = require('./lib/db-wrapper')(logger);

var mpd = Promise.promisifyAll(mpdWrapper);
var db = Promise.promisifyAll(dbWrapper);

var app = express();

app.use(morgan('dev'));

app.use(cors.allowAll);

//
// playlist
//

app.get('/api/playlist/played', function (req, res, next) {

  mpd.getPlayedSongsAsync()
    .then(function (playlist) {
      res.send(playlist);
    })
    .catch(function (err) {
      next(err);
    });

});

app.get('/api/playlist/upcoming', function (req, res, next) {

  mpd.getUpcomingSongsAsync()
    .then(function (playlist) {
      res.send(playlist);
    })
    .catch(function (err) {
      next(err);
    });

})

app.get('/api/playlist/current', function (req, res, next) {

  /*
  var playlist = {
      id : '/var/mp3/current.mp3',
      artist : 'Current',
      song: 'current',
      album: 'album',
      votes: 2
  };
  */

  mpd.getCurrentSongAsync()
    .then(function (song) {
      res.send(song);
    })
    .catch(function (err) {
      next(err);
    });

});

// TODO:
app.get('/api/playlist/add', function (req, res, next) {

  var data = req.query;

  console.log(data);

  res.status(200).send();

});


//
// user
//

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

//
// vote
//

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

//
// music
//

app.get('/api/search', function (req, res) {

    console.log(req.query);

    /*
    if(req.query.query !== "") {
        res.send([songs[0]]);
    } else {
        res.send(songs);
    }
    */

    res.status(200).send();

});


// api takes top precedence
app.use(express.static(__dirname + '/public'));

app.use(function (err, req, res, next) {

    logger.error(err + '');
    res.header('Error', err);
    res.status(500).send();

});

var init = function () {
  var app_http = app.listen(8000);
}

exports.init = init;

if (!module.parent)
{
  init();
};
