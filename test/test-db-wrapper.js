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

  describe("playcounts", function() {

    it("should update the play count", function(done) {
      var songId = chance.string();

      dbWrapper.updatePlayCount(songId, function (err1, count1) {
        expect(err1).to.be.null;
        expect(count1).to.equal(1);

        dbWrapper.updatePlayCount(songId, function (err2, count2) {
          expect(err2).to.be.null;
          expect(count2).to.equal(2);
          done();
        });
      });
    });

    it("should get the play count for a song", function(done) {
      dbWrapper.getPlayCount(chance.string(), function (err, count) {
        expect(err).to.be.null;
        expect(count).to.equal(0);
        done();
      });
    });

  });

  describe("musicUploadDates", function() {
    var now = Math.floor(Date.now());

    it("should insert a musicUploadDate into the db", function(done) {
      dbWrapper.addMusicUploadDate({_id: chance.string(), date: now}, function (err, musicUploadDate) {
        expect(err).to.be.null;
        expect(musicUploadDate).not.to.be.null;
        done();
      });

    });

    it("should find a musicUploadDate by id", function(done) {

      dbWrapper.addMusicUploadDate({_id: chance.string(), date: now}, function (err, musicUploadDate) {
        expect(err).to.be.null;
        dbWrapper.getMusicUploadDate(musicUploadDate._id, function (err, found) {
          expect(err).to.be.null;
          expect(found).not.to.be.null;
          done();
        });

      });
    });

    it("should return sorted musicUploadDate objects", function(done) {
      var now = Math.floor(Date.now());

      dbWrapper.addMusicUploadDate({_id: chance.string(), date: now+1000}, function (err, musicUploadDate1) {
        expect(err).to.be.null;

	dbWrapper.addMusicUploadDate({_id: chance.string(), date: now+2000}, function (err, musicUploadDate2) {
          expect(err).to.be.null;

	  dbWrapper.addMusicUploadDate({_id: chance.string(), date: now+3000}, function (err, musicUploadDate3) {
            expect(err).to.be.null;

	    dbWrapper.addMusicUploadDate({_id: chance.string(), date: now+4000}, function (err, musicUploadDate4) {
              expect(err).to.be.null;

	      dbWrapper.addMusicUploadDate({_id: chance.string(), date: now+5000}, function (err, musicUploadDate5) {
                expect(err).to.be.null;
        
		dbWrapper.getRecentMusic(5, function (err, songs) {
	          expect(err).to.be.null;
        	  expect(songs).not.to.be.null;
		  expect(songs[0].date).to.equal(now+5000);
		  expect(songs[1].date).to.equal(now+4000);
		  expect(songs[2].date).to.equal(now+3000);
		  expect(songs[3].date).to.equal(now+2000);
		  expect(songs[4].date).to.equal(now+1000);
                  console.log(songs);

		  // Delete stuff
		  dbWrapper.removeMusicUploadDate(musicUploadDate1._id, function(err){
  	            expect(err).to.be.null;

		    dbWrapper.removeMusicUploadDate(musicUploadDate2._id, function(err){
  	              expect(err).to.be.null;

		      dbWrapper.removeMusicUploadDate(musicUploadDate3._id, function(err){
  	                expect(err).to.be.null;

		        dbWrapper.removeMusicUploadDate(musicUploadDate4._id, function(err){
  	                  expect(err).to.be.null;

		          dbWrapper.removeMusicUploadDate(musicUploadDate5._id, function(err){
  	                    expect(err).to.be.null;
			    done();
			  });
			
			});
		     
		      });

		    });

		  });

        	});

	      });

	    });

	  });

	});

      });

    });

  });

});
