var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var User = require('../model/user');
var Application = require("../model/application");
var Event = require("../model/event");
var Comment = require("../model/comment");



var appRouter = express.Router();

appRouter
  //Get users owner_applications
  .get('/user/:id/oapplication', function(req, res, next) {
    User.findOne({"_id": req.params.id}).populate('owner_applications').exec(function(err, user) {
      if (err) {
        return next(err);
      }

      res.json(user.owner_applications);
    });
  })
  //Post new application for user
  .post('/user/:id/application', function(req, res, next) {
    var application = new Application(req.body);
    User.findOne({"_id": req.params.id}, function(err, user) {
      if (err) {
        return next(err);
      }
      application.save(function(err, savedApp){
        if(err){
          return next(err);
        }
        User.findByIdAndUpdate(user._id, {$push:{"owner_applications": savedApp._id}}, function (err, user) {
        if(err){
          return next(err);
        }
        Application.findByIdAndUpdate(savedApp._id, {$push:{"owner":user._id}}, function (err, user) {
          if(err){
            return next(err);
          }
          res.json("ok");
        });
        });
      }); 
    });
  })
  //Post to assigned_application collection 
  .post('/application/:aid/user/:id', function(req, res, next) {
      User.findOne({"_id": req.params.id}, function(err, user) {
        if (err) {
          return next(err);
        }
        Application.findOne({"_id": req.params.aid}, function(err, application){
          if(err){
            return next(err);
          }
          
            User.findByIdAndUpdate(user._id,{$push: {"assigned_applications": application._id}}, function(err, user1){
              if(err){
                return next(err);
              }
              Application.findByIdAndUpdate(application._id,{$push: {"users": user._id}}, function(err, app){
                if(err){
                  return next(err);
                }
                res.json('ok');
              });
            });
          
        });
    });
  })
  //Get application by id
  .get('/application/:id', function(req, res, next) {
    Application.findOne({"_id": req.params.id}).populate('users').populate('owner').exec(function(err, application) {
      if (err) {
        return next(err);
      }
      res.json(application);
    });
  })
  //Delete application
  .delete('/application/:id', function (req, res, next) {
    Application.remove({"_id":req.params.id},function (err, successIndicator) {
      if(err){
        return next(err);
      }
      res.json(successIndicator);
    });
  });

module.exports = appRouter;