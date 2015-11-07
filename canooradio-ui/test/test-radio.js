// var request = require('supertest');
var request = require("supertest-as-promised");
var expect = require("chai").expect;
var Chance = require('chance'),
    chance = new Chance();

var radio = require('../radio');

describe("radio", function() {

  var app_url = 'http://localhost:8000';

  before(function (done) {
    radio.init();
    done();
  });

  var routePlaylist = '/api/playlist';
  var routeUser = '/api/user';
  var routePlayer = '/api/player';
  var routeVote = '/api/vote';
  var routeMusicDb = '/api/music';

  describe(routePlaylist, function () {

    it('should get the current song', function () {

      return request(app_url)
        .get(routePlaylist + '/current')
        .expect(200)
        .then(function (res) {
          console.log(res.body);
        });
    });

    it('should get played songs', function () {

      return request(app_url)
        .get(routePlaylist + '/played')
        .expect(200)
        .then(function (res) {
          console.log(res.body);
        });
    });

    it('should get upcoming songs', function () {

      return request(app_url)
        .get(routePlaylist + '/upcoming')
        .expect(200)
        .then(function (res) {
          console.log(res.body);
        });
    });

  });

  describe(routeUser, function () {

    it('should get a user', function () {

      return request(app_url)
        .get(routeUser + '/random')
        .expect(200)
        .then(function (res) {
          var user = res.body;
          expect(user._id).to.equal('random');
          expect(user.id).to.equal('random');
          expect(user.votes).not.to.be.null;
        });
    });

  });

  describe(routePlayer, function () {

    it('should play the next song', function () {

      return request(app_url)
        .get(routeUser + '/next')
        .expect(200)
        .then(function (res) {

        });

    });

  });

  describe(routeMusicDb, function () {

    it('should get a random selection of songs', function () {

      return request(app_url)
        .get(routeMusicDb + '/random?limit=2')
        .expect(200)
        .then(function (res) {
          var songs = res.body;
          expect(songs.length).to.equal(2);
        });
    });

    it('should get top charts', function () {

      return request(app_url)
        .get(routeMusicDb + '/charts?limit=2')
        .expect(200)
        .then(function (res) {
          var songs = res.body;
          expect(songs.length).to.equal(2);
        });
    });

  });

  describe(routeVote, function () {

    it('should upvote for a song', function () {

      return request(app_url)
        .get(routeVote + '/up?filename=snoop.mp3&userId=ignoramus')
        .expect(200)
        .then(function (res) {

        });

    });

  });


  describe("scenario: adding a vote and getting a user", function () {

    it('should add a vote and get a user', function () {

      var userId = chance.string({length: 8, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'});

      return request(app_url)
        .get(routeUser + '/' + userId)
        .expect(200)
        .then(function (res) {
          return res.body;
        })
        .then(function (user) {
          console.log(user);
        });

    });

  });

});
