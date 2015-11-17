
module.exports = function (app, mpd, logger) {

  app.get('/api/player/play', function (req, res, next) {

    mpd.playAsync()
      .then(function () {
        res.status(200).send();
      })
      .catch(function (err) {
        next(err);
      });

  });

  app.get('/api/player/stop', function (req, res, next) {

    mpd.stopAsync()
      .then(function () {
        res.status(200).send();
      })
      .catch(function (err) {
        next(err);
      });

  });

  app.get('/api/player/next', function (req, res, next) {

    mpd.nextAsync()
      .then(function () {
        res.status(200).send();
      })
      .catch(function (err) {
        next(err);
      });

  });


};
