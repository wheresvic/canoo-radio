
var multer = require('multer');
var Promise = require('bluebird');
var _ = require('underscore');
var moment = require('moment');


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

  var validMimeTypes = ['audio/mpeg', 'audio/x-mpeg', 'audio/mp3', 'audio/x-mp3',
                        'audio/mpeg3', 'audio/x-mpeg3', 'audio/mpg', 'audio/x-mpg', 
                        'audio/x-mpegaudio'];

  var multerFileFilter = function(req, file, cb) {
    
    if (validMimeTypes.indexOf(file.mimetype) == -1) {
      console.log(file);
      logger.error(file.originalname + ' has an invalid mimetype ' + file.mimetype);
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

  self.enhanceSongsWithRelativeTimeBeforeNow = function(songs) {
    var time = 0;
    songs.reverse();
    songs.forEach(function(elem){
      if(time === 0) {
        elem.durationAsString = "just played";
      } else{
        elem.durationAsString = moment().subtract(time,'seconds').fromNow();
      }
      time += elem.duration;
    });
    songs.reverse();
    return songs;
  };

  self.enhanceSongsWithRelativeTimeAfterNow = function(songs) {
    var time = 0;
    songs.forEach(function(elem){
      if(time === 0) {
        elem.durationAsString = "coming up";
      } else{
        elem.durationAsString = moment().add(time,'seconds').fromNow();
      }
      time += elem.duration;
    });
    return songs;
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
