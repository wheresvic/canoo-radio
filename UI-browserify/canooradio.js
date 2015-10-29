var express = require('express');
var cors = require('./lib/cors.js');

var app = express();

app.use(cors.allowAll);
app.use(express.static(__dirname + '/public'));

app.use(function (err, req, res, next) {

    logger.error(err + '');
    res.header('Error', err);
    res.status(500).send();

});
var app_http = app.listen(8000);
