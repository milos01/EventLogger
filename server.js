var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// koristimo mongoose model koju smo kreirali u folderu model
var User = require('./model/user');
var Application = require("./model/application");
var Event = require("./model/event");
var Comment = require("./model/comment");
// var Comment = require('../app/model/comment');

mongoose.connect('mongodb://localhost/eventlogger');


// konfigurisemo bodyParser()
// da bismo mogli da preuzimamo podatke iz POST zahteva
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // na kom portu slusa server

// ruter za blogEntries
var userRouter = express.Router();
var appRouter = express.Router();
var eventRouter = express.Router();
var commentRouter = express.Router(); 

 // koristimo express Router

// definisanje ruta za blog
userRouter
  .get('/user/:id', function(req, res, next) {
    User.findOne({"_id": req.params.id})
    .populate('owner_applications').exec(function(err, user) {
      // ako se desila greska predjemo na sledeci middleware (za rukovanje greskama)
      if (err){
        return next(err);
      }
      res.json(user);
    });
  })
  .get('/user', function(req, res) {
      User.find({}, function(err, data, next) {
        res.json(data);
      });
  })
  .post('/user', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err, user) {
      if (err) {
        return next(err);
      }

      res.json(user);

    });
  })
  .get('/user/:id/application', function(req, res, next) {
    User.findOne({"_id": req.params.id}, function(err, user) {
      if (err) {
        return next(err);
      }

      res.json(user.owner_applications);
    });
  })
  
  .put('/:id', function(req, res, next) {
    // BlogEntry.findOne({
    //   "_id": req.params.id
    // }, function(err, blogEntry) {
    //   if (err) next(err);
    //   var newEntry = req.body;
    //   blogEntry.title = newEntry.title;
    //   blogEntry.description = newEntry.description;
    //   blogEntry.entry = newEntry.entry;
    //   blogEntry.save(function(err, blogEntry) {
    //     if (err) next(err);
    //     res.json(blogEntry);
    //   });
    // });
  })
  .delete('/:id', function(req, res, next) {
    // BlogEntry.remove({
    //   "_id": req.params.id
    // }, function(err, successIndicator) {
    //   if (err) next(err);
    //   res.json(successIndicator);
    // });
  });

// ruter za comments
// koristimo express Router

appRouter
.post('/blogEntry/:id',function(req, res, next) {
  // var comment = new Comment(req.body);
  // BlogEntry.findOne({"_id":req.params.id},function (err, entry) {
  //   if(err) next(err);
  //   comment.save(function (err, comment) {
  //     if(err) next(err);
  //     BlogEntry.findByIdAndUpdate(entry._id, {$push:{"comments":comment._id}}, function (err, entry) {
  //       if(err) next(err);
  //       res.json(entry);
  //     });
  //   });
  // });
})
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
.get('/application/:id', function(req, res, next) {
    Application.findOne({"_id": req.params.id}).populate('users').populate('owner').exec(function(err, application) {
      if (err) {
        return next(err);
      }
      res.json(application);
      // Application.findOne({"_id": req.params.id}).populate('owner').exec(function(err, application01) {
      //   if (err) {
      //     return next(err);
      //   }
      //   res.json(application01);
      // });
      
    });
  })
.delete('/application/:id', function (req, res, next) {
  Application.remove({"_id":req.params.id},function (err, successIndicator) {
    if(err){
      return next(err);
    }
    res.json(successIndicator);
  });
});



eventRouter
.post('/application/:aid/event', function(req, res, next) {
  var event = new Event(req.body);
    Application.findOne({"_id": req.params.aid}, function(err, application) {
      if (err) {
        return next(err);
      }
      application.events.push(event);
      application.save(function(err, savedEvent){
        if (err) {
          return next(err);
        }
        res.json(savedEvent);
      });
  });
})
.get('/application/:aid/event', function(req, res, next) {
    Application.findOne({"_id": req.params.aid}, function(err, application) {
      if (err) {
        return next(err);
      }
      res.json(application.events);
  });
})
.delete('/application/:aid/event/:eid', function(req, res, next) {
  Application.update( 
      { _id: req.params.aid },
      { $pull: { events : { _id : req.params.eid } } },
      { safe: true },
      function removeConnectionsCB(err, obj) {
          res.json("ok");
      });
});

commentRouter
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

// // dodavanje rutera zu blogEntries /api/blogEntries
app.use('/api', userRouter);
app.use('/api', appRouter);
app.use('/api', eventRouter);
app.use('/api', commentRouter);
// // dodavanje ruter zu komentare /api/blogEntries
// app.use('/api/comments', commentRouter);


//na kraju dodajemo middleware za obradu gresaka
app.use(function(err, req, res, next) {
  var message = err.message;
  var error = err.error || err;
  var status = err.status || 500;

  res.status(status).json({
    message: message,
    error: error
  });
});


// Pokretanje servera
app.listen(port);


console.log('Server running on port: ' + port);
