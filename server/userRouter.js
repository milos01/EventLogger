var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var User = require('../model/user');
var Application = require("../model/application");
var Event = require("../model/event");
var Comment = require("../model/comment");

var userRouter = express.Router();

userRouter
  //Get user by Id with owner_applications and assigned_applications
  .get('/user/:id', function(req, res, next) {
    User.findOne({"_id": req.params.id})
    .populate('owner_applications').populate('assigned_applications').exec(function(err, user) {
      if (err){
        return next(err);
      }
      res.json(user);
    });
  })
  //Get all users with owner_applications and assigned_applications
  .get('/user', function(req, res) {
      User.find({}).populate('owner_applications').populate('assigned_applications').exec(function(err, data, next) {
        res.json(data);
      });
  })
  //Post new user
  .post('/user', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err, user) {
      if (err) {
        return next(err);
      }

      res.json(user);

    });
  })
  
module.exports = userRouter;