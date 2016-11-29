var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var User = require('../model/user');
var Application = require("../model/application");
var Event = require("../model/event");
var Comment = require("../model/comment");

var commentRouter = express.Router(); 

commentRouter
  //Post new comment
  .post('/event/:eid/comment', function(req, res, next) {
      var comment = new Comment(req.body);
      
      
      Application.findOne({"events._id": req.params.eid}, function (err, ev) {
        if (err) {
          return next(err);
        }
       
        var event = ev.events.filter(function (event) {
          return event.data === 'some_data';
        }).pop();
        // res.json(event.comments);
        event.comments.push(comment);
        // res.json(event.comments);
        ev.save(function(err, savedEvent) {
          if (err) {
            return next(err);
          }
          res.json(savedEvent);
        });
    });
  })
  //Get event comments
  .get('/event/:eid/comment', function(req, res, next) {
      var comment = new Comment(req.body);
      
      
      Application.findOne({"events._id": req.params.eid}, function (err, ev) {
        if (err) {
          return next(err);
        }
       
        var event = ev.events.filter(function (event) {
          return event.data === 'some_data';
        }).pop();
        res.json(event.comments);
    });
  })

module.exports = commentRouter;