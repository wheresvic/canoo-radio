// nedb is pretty sick as it maintains a mongodb like interface with sqlite type file db capabilities
var Datastore = require('nedb');

var dbWrapper = function (logger) {

  var db = { };

  var self = {

  };

  self.initialize = function () {

    db.users = new Datastore({ filename: 'users.db', autoload: true });
    db.users.loadDatabase(function (err) {
      logger.info('loaded users');
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

  self.initialize();

  return self;
};

module.exports = dbWrapper;
