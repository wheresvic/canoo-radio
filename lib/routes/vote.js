
module.exports = function (app, db, logger) {

  app.get('/api/vote/up', function (req, res, next) {

    db.voteUpAsync(req.query.userId, req.query.filename)
      .then(function (results) {
        res.status(200).send();
      })
      .catch(function (err) {
        next(err);
      });
  });


  app.get('/api/vote/down', function (req, res, next) {

    db.voteDownAsync(req.query.userId, req.query.filename)
      .then(function (results) {
        res.status(200).send();
      })
      .catch(function (err) {
        next(err);
      });

  });

  app.get('/api/vote/clear', function (req, res, next) {

    db.voteClearAsync(req.query.userId, req.query.filename)
      .then(function (results) {
        res.status(200).send();
      })
      .catch(function (err) {
        next(err);
      });

  });

};
