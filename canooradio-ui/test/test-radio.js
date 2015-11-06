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

});
