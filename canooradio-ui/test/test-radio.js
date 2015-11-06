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

    var route = '/played';

    describe('GET ' + route, function () {

      it('should return 200', function (done) {

        request(app_url)
          .get(routePlaylist + route)
          .end(function (err, res) {

            if (err) {
              return done(err);
            }

            expect(res.status).to.equal(200);
            return done();
          });
      });

    });

  });

});
