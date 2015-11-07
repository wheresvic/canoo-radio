/**
 * TODO: extract configuration
 */

var express = require('express');
var morgan = require('morgan');
var Promise = require('bluebird');
var _ = require('underscore');

var env = process.env.ENV;

var cors = require('./lib/cors.js');
var logger = require('./lib/logger.js').logger;
var mpdWrapper = require('./lib/mpd-wrapper')(env, 'localhost', 6600, logger);
var dbWrapper = require('./lib/db-wrapper')(logger);

//
// promisify expects functions that take arguments with a callback as the last parameter
// the callback must pass the error as it's first parameter and a result as the second
// in case there are multiple results then they are converted into an array
//
var mpd = Promise.promisifyAll(mpdWrapper);
var db = Promise.promisifyAll(dbWrapper);

var app = express();

// app.use(morgan('dev'));

app.use(cors.allowAll);

//
// common
//

/**
 * Given a list of songs, return a promise that adds the votes property to each of them
 * The promise is fulfilled when all songs have their votes calculated
 */
var enhanceSongsWithVotes = function (songs) {

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
var updateUserQueue = function (user, songs) {

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

//
// playlist routes
//

app.get('/api/playlist/played', function (req, res, next) {

  mpd.getPlayedSongsAsync(10)
    .then(function (playlist) {
      return enhanceSongsWithVotes(playlist);
    })
    .then(function (songs) {
      res.send(songs);
    })
    .catch(function (err) {
      next(err);
    });

});

app.get('/api/playlist/upcoming', function (req, res, next) {

  mpd.getUpcomingSongsAsync()
    .then(function (playlist) {
      return enhanceSongsWithVotes(playlist);
    })
    .then(function (songs) {
      res.send(songs);
    })
    .catch(function (err) {
      next(err);
    });

});

app.get('/api/playlist/current', function (req, res, next) {

  mpd.getCurrentSongAsync()
    .then(function (song) {
      return enhanceSongsWithVotes([song]);
    })
    .then(function (songs) {
      res.send(songs[0]);
    })
    .catch(function (err) {
      next(err);
    });

});

app.get('/api/playlist/add', function (req, res, next) {

  var data = req.query;
  console.log(data);

  //
  // if user not found then cannot add song
  //
  // get the user, get the upcoming song list
  // refresh the user queue with what is in the upcoming song list
  // if the queue has space then
  //   check if the song is not already on the queue
  //   if yes, then save user and return
  //   if no, then add song to the playlist, update the user queue, save user and return
  //

  db.getUserAsync(data.userId)
    .then(function (user) {

      if (user) {

        mpd.getUpcomingSongsAsync()
          .then(function (songs) {

            user = updateUserQueue(user, songs);

            if (user.queue.length > 3) {
              res.status(403).send();
            } else { // user queue has space

              if (user.queue.indexOf(data.filename) > -1) {
                db.updateUserAsync(user)
                  .then(function (results) {
                    res.status(200).send();
                  });
              } else { // user queue does not contain this song

                //
                // update queue with new song, add it to the playlist, save the user and return
                //

                user.queue.push(data.filename);

                mpd.addSongToPlaylistAsync(data.filename)
                  .then(function () {
                    logger.debug('updating user ' + user.queue.length);
                    return db.updateUserAsync(user);
                  })
                  .then(function (results) {
                    res.status(200).send();
                  });
              }
            }
          });

      } else { // no user found
        res.status(401).send();
      }

    })
    .catch(function (err) {
      next(err);
    });

});


//
// user routes
//

app.get('/api/user/:id', function (req, res, next) {

  db.getUserAsync(req.params.id)
    .then(function (user) {

      if (user) { // user found, get their votes and return it

        user.votes = {};

        return db.getUserVotesAsync(user._id)
          .then(function (votes) {

            _.each(votes, function (vote) {
              user.votes[vote.songId] = vote.value;
            })

            return user;
          });

      } else { // no user found, we create one, add it to the db and return it

        var u = {
          _id: req.params.id
        }

        return db.addUserAsync(u)
          .then(function (inserted) {
            inserted.votes = {};
            return inserted;
          });
      }

    })
    .then(function (user) {
      res.send(user);
    })
    .catch(function (err) {
      next(err);
    });

});

//
// vote routes
//

require('./lib/routes/vote')(app, db, logger);

//
// music db routes
//

app.get('/api/music/search', function (req, res) {

  var term = req.query.query;

  mpd.searchAsync(term)
    .then(function (songs) {
      res.send(songs);
    })
    .catch(function (err) {
      next(err);
    });
});

app.get('/api/music/random', function (req, res) {

  var limit = parseInt(req.query.limit);

  mpd.getAllSongsAsync()
    .then(function (songs) {
      return enhanceSongsWithVotes(songs.slice(0, limit));
    })
    .then(function (songs) {
      res.send(songs);
    })
    .catch(function (err) {
      next(err);
    });
});

app.get('/api/music/charts', function (req, res) {

  var limit = parseInt(req.query.limit);

  mpd.getAllSongsAsync()
    .then(function (songs) {
      return enhanceSongsWithVotes(songs);
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

      res.send(songs.slice(0, limit));
    })
    .catch(function (err) {
      next(err);
    });
});

//
// player routes
//

require('./lib/routes/player')(app, mpd, logger);

// api takes top precedence
app.use(express.static(__dirname + '/public'));

app.use(function (err, req, res, next) {

    logger.error(err + '');
    res.header('Error', err);
    res.status(500).send();

});

var init = function () {
  var port = 8000;
  var app_http = app.listen(port);
  logger.info('listening on ' + port);
}

exports.init = init;

if (!module.parent)
{
  init();
};
