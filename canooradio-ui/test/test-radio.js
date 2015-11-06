var request = require('supertest');
var expect = require("chai").expect;

var radio = require('../radio');

describe("server", function() {

  var app_url = 'http://localhost:8000';

  before(function (done) {
    radio.init();
    done();
  });

  var routePlaylist = '/api/playlist';
  var routeUser = '/api/user';
  var routePlayer = '/api/player';
  var routeVote = '/api/vote';
  var routeMusicDb = '/api/db';

  describe(routePlaylist, function () {

    it('should get the current song', function (done) {

      request(app_url)
        .get(routePlaylist + '/current')
        .end(function (err, res) {

          if (err) {
            return done(err);
          }

          console.log(res.body);
          expect(res.status).to.equal(200);
          return done();
        });
    });

    it('should get played songs', function (done) {

      request(app_url)
        .get(routePlaylist + '/played')
        .end(function (err, res) {

          if (err) {
            return done(err);
          }

          console.log(res.body);
          expect(res.status).to.equal(200);
          return done();
        });
    });

    it('should get upcoming songs', function (done) {

      request(app_url)
        .get(routePlaylist + '/upcoming')
        .end(function (err, res) {

          if (err) {
            return done(err);
          }

          console.log(res.body);
          expect(res.status).to.equal(200);
          return done();
        });
    });

  });

  describe(routeUser, function () {

    it('should get a user', function (done) {

      request(app_url)
        .get(routeUser + '/random')
        .end(function (err, res) {

          if (err) {
            return done(err);
          }

          expect(res.status).to.equal(200);

          var user = res.body;
          expect(user._id).to.equal('random');
          expect(user.id).to.equal('random');
          expect(user.votes).not.to.be.null;

          return done();
        });
    });

  });

  describe(routePlayer, function () {

    it('should play the next song', function (done) {

      request(app_url)
        .get(routeUser + '/next')
        .end(function (err, res) {

          if (err) {
            return done(err);
          }

          expect(res.status).to.equal(200);
          return done();
        });
    });

  });

  describe(routeMusicDb, function () {

    it('should get a random selection of songs', function (done) {

      request(app_url)
        .get(routeMusicDb + '/random?limit=2')
        .end(function (err, res) {

          if (err) {
            return done(err);
          }

          expect(res.status).to.equal(200);

          var songs = res.body;
          expect(songs.length).to.equal(2);

          return done();
        });
    });

    it('should get top charts', function (done) {

      request(app_url)
        .get(routeMusicDb + '/charts?limit=2')
        .end(function (err, res) {

          if (err) {
            return done(err);
          }

          expect(res.status).to.equal(200);

          var songs = res.body;
          expect(songs.length).to.equal(2);

          return done();
        });
    });

  });

  describe(routeVote, function () {

    it('should upvote for a song', function (done) {

      request(app_url)
        .get(routeVote + '/up?filename=snoop.mp3&userId=ignoramus')
        .end(function (err, res) {

          if (err) {
            return done(err);
          }

          expect(res.status).to.equal(200);
          return done();
        });
    });

  });


  describe("scenario: adding a vote and getting a user", function () {

    it('should add a vote and get a user', function (done) {

      // TODO:
      request(app_url)
        .get(routeUser + '/random')
        .end(function (err, res) {

          if (err) {
            return done(err);
          }

          expect(res.status).to.equal(200);

          var user = res.body;
          expect(user._id).to.equal('random');
          expect(user.id).to.equal('random');
          expect(user.votes).not.to.be.null;

          return done();
        });
    });

  });

});
