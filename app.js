var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var blockchain = require('./blockchain/blockchain');
var index = require('./routes/index');
var authenticate = require('./routes/authenticate');
var votingbooth = require('./routes/votingbooth');
var processing = require('./routes/processing');
var voted = require('./routes/voted');
var trackblock = require('./routes/trackblock');
var networking = require('./blockchain/networking');
var file = require('./blockchain/filemanager');
var connections = require('./config/connections');
var app = express();

port = 3001;

//Set up mysql
var mysql = require('mysql');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var dbconfig = require('./config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
var session = require('client-sessions');
global.db = connection;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

file.loadBlockchainJSON();

networking.initNetworkingServer(port);
networking.connectToPeers(connections.server1);

app.use(session({
    cookieName: 'session',
    secret: '3fSSgXgevb60GGE8jGGCJ8OzNWZ76Nc2CybzMzSLH8h1xHo3CXTybWSZFwik4bj6wyMZ5wEAN4ArjopU2FmO1KTtbgdYqmsv6GVk',
    duration: 5 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    secure: false,
    path:'/'
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

app.use('/', index);
app.use('/authenticate', authenticate);
app.use('/votingbooth', votingbooth);
app.use('/processing', processing);
app.use('/voted', voted);
app.use('/trackblock', trackblock);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
