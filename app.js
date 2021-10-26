var express = require('express');
var logger = require('morgan');
var path = require('path')
var routes = require('./routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/', routes);

module.exports = app;
