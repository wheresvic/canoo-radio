
var expect = require("chai").expect;
var assert = require('chai').assert;

var logger = require('../lib/logger.js').logger;
var dbWrapper = require('../lib/db-wrapper')(logger);

describe("db-wrapper", function() {

  describe("users", function() {

    it("should insert a user into the db", function(done) {

      dbWrapper.addUser({name: 'snoop'}, function (err, user) {
        expect(user).not.to.be.null;
        done();
      });

    });

    it("should find a user by id", function(done) {

      dbWrapper.addUser({name: 'dawg'}, function (err, user) {
        dbWrapper.getUser(user._id, function (err, found) {
          expect(found).not.to.be.null;
          done();
        });

      });
    });

    it("should update a user", function(done) {

      dbWrapper.addUser({name: 'yoyo'}, function (err, user) {
        user.lastname = 'ma';
        dbWrapper.updateUser(user, function (err, numUpdated) {
          dbWrapper.getUser(user._id, function (err, found) {
            expect(found.lastname).to.equal('ma');
            done();
          });
        });

      });
    });

  });

  describe("votes", function() {

    it("should upvote a song", function(done) {

      dbWrapper.voteUp('migros', 'coach.mp3', function (err, num, vote) {
        console.log(vote); // probably undefined since this is an upsert operation
        expect(num).to.equal(1);
        done();
      });

    });

    it("should clear a vote", function(done) {

      dbWrapper.voteClear('random', 'random', function (err, num) {
        expect(num).to.equal(0);
        done();
      });

    });

    it("should error on missing userId when clearing a vote", function(done) {

      dbWrapper.voteClear('', 'random', function (err, num) {
        if (err) {
          return done();
        }

        throw new Error('should have thrown a userId missing error :(');
      });

    });

    it("should error on missing userId when upvoting", function(done) {

      dbWrapper.voteUp('', 'random', function (err, num, vote) {
        if (err) {
          return done();
        }

        throw new Error('should have thrown a userId missing error :(');
      });

    });

  });

});
