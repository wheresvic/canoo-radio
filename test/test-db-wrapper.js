var Chance = require('chance'),
    chance = new Chance();
var expect = require("chai").expect;
var assert = require('chai').assert;

var logger = require('../lib/logger.js').logger;
var dbWrapper = require('../lib/db-wrapper')(logger);

describe("db-wrapper", function() {

  describe("users", function() {

    it("should insert a user into the db", function(done) {

      dbWrapper.addUser({_id: chance.string(), name: 'snoop'}, function (err, user) {
        expect(err).to.be.null;
        expect(user).not.to.be.null;
        done();
      });

    });

    it("should find a user by id", function(done) {

      dbWrapper.addUser({_id: chance.string(), name: 'dawg'}, function (err, user) {
        expect(err).to.be.null;
        dbWrapper.getUser(user._id, function (err, found) {
          expect(err).to.be.null;
          expect(found).not.to.be.null;
          done();
        });

      });
    });

    it("should update a user", function(done) {

      dbWrapper.addUser({_id: chance.string(), name: 'yoyo'}, function (err, user) {
        expect(err).to.be.null;
        
        user.lastname = 'ma';
        
        dbWrapper.updateUser(user, function (err, numUpdated) {
          expect(err).to.be.null;
          
          dbWrapper.getUser(user._id, function (err, found) {
            expect(err).to.be.null;
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
        expect(err).to.be.null;
        console.log(vote); // probably undefined since this is an upsert operation
        expect(num).to.equal(1);
        done();
      });

    });

    it("should clear a vote", function(done) {

      dbWrapper.voteClear('random', 'random', function (err, num) {
        if (err) throw err;
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

    it("should get votes for a song", function(done) {

      var songId = 'song.mp3';

      dbWrapper.voteUp('a', songId, function (err, num1) {
        expect(err).to.be.null;
        dbWrapper.voteUp('b', songId, function (err, num2) {
          expect(err).to.be.null;
          dbWrapper.getVotesForSong(songId, function (err, sum) {
            expect(err).to.be.null;
            expect(sum).to.equal(2);
            done();
          });
        });
      });
    });

  });

});
