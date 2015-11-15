
var multer = require('multer');
var Promise = require('bluebird');
var _ = require('underscore');


module.exports = function (db, mpd, logger) {

  var self = {

  };

  //
  // TODO: make the multer options confgurable
  //

  var multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/var/lib/mpd/music');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

  var multerFileFilter = function(req, file, cb) {
    if (file.mimetype !== 'audio/mp3') {
      return cb(null, false);
    }

    cb(null, true);
  };

  var multerLimits = {
    files: 1,
    fileSize: (2097152 * 10) // 20 MB
  };


  /**
   *
   */
  self.upload = multer({
    storage: multerStorage,
    limits: multerLimits,
    fileFilter: multerFileFilter
  });

  /**
   * Given a list of songs, return a promise that adds the votes property to each of them
   * The promise is fulfilled when all songs have their votes calculated
   */
  self.enhanceSongsWithVotes = function (songs) {

    return Promise.map(songs, function (song) {

      return db.getVotesForSongAsync(song.id)
        .then(function (sum) {
          song.votes = sum;
        });

    }).then(function () { // waits for the mapped promises to finish
      return songs;
    });

  };

  /**
   * Given a user a list of upcoming songs
   * check which song is already in the users queue and refresh the user queue
   */
  self.updateUserQueue = function (user, songs) {

    if (!user.hasOwnProperty('queue')) {
      user.queue = [];
    }

    var newQueue = [];

    _.each(songs, function (song) {
      if (user.queue.indexOf(song.id) >= 0) {
        newQueue.push(song.id);
      }
    });

    user.queue = newQueue;

    return user;
  };

  /**
   * Check if a given song exists in a list of songs
   */
  self.songExists = function (path, songs) {

    for (var i = 0; i < songs.length; ++i) {
      if (path === songs[i].id) {
        return true;
      }
    }

    return false;

  };

  self.enhanceSongsWithUserInfo = function (userId, songs) {

    return db.getUserAsync(userId)
      .then(function (user) {

        if (user) {
          _.each(user.queue, function (path) {
            _.each(songs, function (song) {
              if (song.id === path) {
                song.isMine = true;
              }
            });
          });
        }

        return songs;
      });

  }

  return self;
};
