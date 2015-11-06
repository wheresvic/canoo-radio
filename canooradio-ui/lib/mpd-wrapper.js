
var _ = require('underscore');

var mpd = require('mpd'),
    cmd = mpd.cmd;

var mpdWrapper = function (host, port, logger) {

  var self = {

  };

  var client = mpd.connect({
    port: 6600,
    host: 'localhost',
  });

  client.on('ready', function() {
    logger.info("mpd connected to " + host + ":" + port);
  });

  /**
   * Standardize object interface
   */
  var processKey = function (key) {

    if (key === 'file') {
      return 'id';
    } else if (key === 'Artist') {
      return 'artist';
    } else if (key === 'Title') {
      return 'song';
    }

    return null;
  };

  var getObjArrayFromMpdResponse = function (msg, key) {

    var result = [];
    var obj = {

    };

    var parts = msg.split('\n');
    // console.log(parts);

    _.each(parts, function (part) {
      var kv = part.split(':');

      if (kv[0] && kv[1]) {

        // this is a new object
        if (kv[0] === key) {
          if (Object.keys(obj).length) {
            result.push(obj);
            obj = { };
          }
        }

        var value = kv[1].replace(' ', '');

        if (!isNaN(value)) {
          value = (+value);
        }

        obj[kv[0]] = value;

        var processed = processKey(kv[0]);
        if (processed) {
          obj[processed] = value;
        }

      }

    });

    if (Object.keys(obj).length) {
      result.push(obj);
      obj = { };
    }

    return result;

  };

  var getObjFromMpdResponse = function (msg) {

    // console.log(msg);

    var obj = {

    };

    var parts = msg.split('\n');

    _.each(parts, function (part) {
      var kv = part.split(':');

      if (kv[0] && kv[1]) {
        var value = kv[1].replace(' ', '');

        if (!isNaN(value)) {
          value = (+value);
        }

        obj[kv[0]] = value;

        var processed = processKey(kv[0]);
        if (processed) {
          obj[processed] = value;
        }
      }

    });

    return obj;
  };


  var executeObjCmd = function (command, cb) {

    client.sendCommand(cmd(command, []), function (err, msg) {
      var obj = getObjFromMpdResponse(msg);
      cb(err, obj);
    });

  };

  self.getStatus = function (cb) {

    /*
    { volume: -1,
    repeat: 0,
    random: 0,
    single: 0,
    consume: 0,
    playlist: 2,
    playlistlength: 1,
    mixrampdb: 0,
    state: 'play',
    song: 0,
    songid: 1,
    time: 5,
    elapsed: 4.748,
    bitrate: 192,
    audio: 44100 }
    */

    executeObjCmd('status', cb);

  };

  self.getCurrentSong = function (cb) {

    /*
    { file: 'tina-malia-gayatri-mantra.mp3',
    'Last-Modified': '2015-09-26T09',
    Time: 457,
    Artist: 'Tina Malia',
    Title: 'Gayatri mantra',
    Track: -1,
    Date: -1,
    Pos: 0,
    Id: 1 }{ file: 'tina-malia-gayatri-mantra.mp3',
    'Last-Modified': '2015-09-26T09',
    Time: 457,
    Artist: 'Tina Malia',
    Title: 'Gayatri mantra',
    Track: -1,
    Date: -1,
    Pos: 0,
    Id: 1 }
    */

    executeObjCmd('currentsong', cb);
  };

  self.play = function (cb) {
    executeObjCmd('play', cb);
  };

  self.stop = function (cb) {
    executeObjCmd('stop', cb);
  };

  self.next = function (cb) {
    executeObjCmd('next', cb);
  };

  self.getCurrentPlaylistInfo = function (cb) {
    client.sendCommand(cmd("playlistinfo", []), function (err, msg) {
      // console.log(msg);
      cb(err, getObjArrayFromMpdResponse(msg, 'file'));
    });
  };

  self.search = function (term, cb) {
    client.sendCommand(cmd("search", ['any', term]), function (err, msg) {
      // console.log(msg);
      cb(err, getObjArrayFromMpdResponse(msg, 'file'));
    });
  };

  self.getAllSongs = function (cb) {
    client.sendCommand(cmd("listall", []), function (err, msg) {
      // console.log(msg);
      cb(err, getObjArrayFromMpdResponse(msg, 'file'));
    });
  };

  self.updateDb = function (cb) {
    executeObjCmd('update', cb);
  };

  self.addSongToPlaylist = function (filePath, cb) {

    client.sendCommand(cmd("add", [filePath]), function (err, msg) {
      cb(err, getObjFromMpdResponse(msg));
    });

  };

  self.getUpcomingSongs = function (cb) {

    self.getCurrentSong(function (err, song) {

      if (err) {
        cb(err);
        return;
      }

      self.getCurrentPlaylistInfo(function (err, playlist) {

        if (err) {
          cb(err);
          return;
        }

        if (song && song.Pos) {
          cb(null, playlist.slice(song.Pos + 1));
        } else {
          cb(null, playlist);
        }

      });

    });

  };

  self.getPlayedSongs = function (num, cb) {

    self.getCurrentSong(function (err, song) {

      if (err) {
        cb(err);
        return;
      }

      self.getCurrentPlaylistInfo(function (err, playlist) {

        if (err) {
          cb(err);
          return;
        }

        // console.log(playlist);

        if (song && song.Pos) {
          cb(null, playlist.slice(0, song.Pos));
        } else {
          cb(null, []);
        }

      });

    });

  };

  return self;

};


/*
client.on('system', function(name) {
  console.log("update", name);
});

client.on('system-player', function() {
  client.sendCommand(cmd("status", []), function(err, msg) {
    if (err) throw err;
    console.log(msg);
  });
});
*/

module.exports = mpdWrapper;
