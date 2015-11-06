
var expect = require("chai").expect;
var assert = require('chai').assert;

var dbWrapper = require('../lib/db-wrapper')();

describe("db-wrapper", function() {

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
