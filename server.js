var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/eventlogger');

var userrouter = require('./server/userRouter');
var approuter = require('./server/appRouter');
var eventrouter = require('./server/eventRouter');
var commentrouter = require('./server/commentRouter');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 

app.use('/api', userrouter);
app.use('/api', approuter);
app.use('/api', eventrouter);
app.use('/api', commentrouter);

app.use(function(err, req, res, next) {
  var message = err.message;
  var error = err.error || err;
  var status = err.status || 500;

  res.status(status).json({
    message: message,
    error: error
  });
});

app.listen(port);

console.log('Server running on port: ' + port);
