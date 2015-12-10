
var fs = require('fs');
var mm = require('musicmetadata');
var Promise = require('bluebird');
var _ = require('underscore');

var util = require('../util');

module.exports = function (app, mpd, db, logger) {

  var routeUtil = require('./route-util')(db, mpd, logger);

  app.get('/api/music/search', function (req, res, next) {

    var term = req.query.query;

    mpd.searchAsync(term)
      .then(function (songs) {
        res.send(songs);
      })
      .catch(function (err) {
        next(err);
      });
  });

  app.get('/api/music/random', function (req, res, next) {

    var limit = parseInt(req.query.limit);

    mpd.getAllSongsAsync()
      .then(function (songs) {

        var santized = [];

        _.each(songs, function (song) {
          if (song.artist && song.song) {
            santized.push(song);
          }
        });

        util.shuffleArray(santized);
        return santized;
      })
      .then(function (songs) {
        return routeUtil.enhanceSongsWithVotes(songs.slice(0, limit));
      })
      .then(function (songs) {
        res.send(songs);
      })
      .catch(function (err) {
        next(err);
      });
  });

  app.get('/api/music/charts', function (req, res, next) {

    var limit = parseInt(req.query.limit);

    mpd.getAllSongsAsync()
      .then(function (songs) {
        return routeUtil.enhanceSongsWithVotes(songs);
      })
      .then(function (songs) {

        songs.sort(function (a, b) {
          if (a.votes > b.votes) {
            return -1;
          }

          if (a.votes < b.votes) {
            return 1;
          }

          return 0;
        });

        return songs.slice(0, limit);
      })
      .then(function (songs) {
        return routeUtil.enhanceSongsWithPlayCounts(songs);
      })
      .then(function (songs) {
        res.send(songs);
      })
      .catch(function (err) {
        next(err);
      });
  });

  app.post('/api/music/upload', routeUtil.upload.single('file'), function (request, response, next) {

    // console.log(request);

    if (!request.hasOwnProperty("file")) {
        // 500 couldn't upload the file
        return response.status(500).send();
    }

    var file = request.file;

    if (file.truncated) {
        // 413 Request Entity Too Large
        logger.info("Request aborted.");
        return response.status(413).send();
    }

    // do stuff with file
    console.log(file);

    var parser = mm(fs.createReadStream(file.path), function (err, metadata) {
      if (err) throw err;
      console.log(metadata);

      if (!metadata.title || metadata.artist.length === 0) {
        response.status(400).send();
        return;
      }

      mpd.updateDbAsync()
        .then(function (obj) {
          logger.info(file.path + ' uploaded');
          response.status(200).send();
        })
        .catch(function (err) {
          next(err);
        });

    });
  });


};
