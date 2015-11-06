// nedb is pretty sick as it maintains a mongodb like interface with sqlite type file db capabilities
var Datastore = require('nedb');

var dbWrapper = function (logger) {

  var db = { };

  var self = {

  };

  self.initialize = function () {

    db.users = new Datastore({ filename: 'users.db', autoload: true });

    db.votes = new Datastore({ filename: 'votes.db', autoload: true });

    db.users.loadDatabase(function (err) {
      logger.info('loaded users');
    });

    db.votes.loadDatabase(function (err) {
      logger.info('loaded votes');
    });

  };

  self.addUser = function (user, cb) {
    user._id = user.id;
    db.users.insert(user, cb);
  };

  self.getUser = function (id, cb) {
    db.users.findOne({_id : id}, cb);
  };

  self.updateUser = function (user, cb) {
    db.users.update({_id: user._id}, user, {}, cb);
  };

  self.getUserVotes = function (userId, cb) {
    db.votes.find({userId: userId}, cb);
  };

  var createVoteId = function (userId, songId) {

    if (userId && songId)
      return userId + '-' + songId;

    throw new Error('userId and/or songId cannot be null');
  }

  var voteUpsert = function (userId, songId, value, cb) {

    try {
      var vote = {
        _id: createVoteId(userId, songId),
        userId: userId,
        songId: songId,
        value: value
      }

      db.votes.update({_id: vote._id}, vote, {upsert: true}, cb);
    } catch (err) {
      cb(err);
    }

  }

  self.voteUp = function (userId, songId, cb) {
    voteUpsert(userId, songId, 1, cb);
  };

  self.voteDown = function (userId, songId, cb) {
    voteUpsert(userId, songId, -1, cb);
  };

  self.voteClear = function (userId, songId, cb) {
    try {
      db.votes.remove({_id: createVoteId(userId, songId)}, {}, cb);
    } catch (err) {
      cb(err);
    }
  };

  self.initialize();

  return self;

};

module.exports = dbWrapper;
