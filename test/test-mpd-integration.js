// var fs = require('fs');
// var mm = require('musicmetadata');

var expect = require("chai").expect;
var assert = require('chai').assert;

var env = process.env.ENV;

var logger = require('../lib/logger.js').logger;
var mpdWrapper = require('../lib/mpd-wrapper')(env, 'localhost', 6600, logger);

describe("mpd integration", function() {

  it("should get info for a random song", function(done) {

    mpdWrapper.getAllSongs(function (err, songs) {
      console.log(songs.length);
      expect(songs.length).to.be.at.least(1);

      var song = songs[0];
      console.log(song);

      expect(song.artist).to.not.be.null;
      expect(song.song).to.not.be.null;
      expect(song.duration).to.not.be.null;
      expect(song.file).to.not.be.null;
      expect(song.id).to.not.be.null;

      done();
    });

  });


});
