var express = require('express');
var router = express.Router()
var mongoose = require('mongoose');
var passport = require('passport');
var expressJWT = require('express-jwt');
var auth = expressJWT({secret: 'myLittleSecret'});

require('../config/passport');

var Recording = require('../models/Recordings');
var User = require('../models/Users');
var Group = require('../models/Groups');


router.get('/user', auth, function (req, res) {
  res.json(req.user);
});

router.post('/register', function(req, res, next){
  if(!req.body.phoneNum || !req.body.password || !req.body.nameFirst || !req.body.nameLast){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.phoneNum = req.body.phoneNum;
  user.nameFirst = req.body.nameFirst;
  user.nameLast = req.body.nameLast;


  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/groups', function(req, res, next){
  if(!req.body.name){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var group = new Group();

  group.name = req.body.name;
  
  group.save(function (err, msg){
    if(err){ return next(err); }

    return res.json(msg)
  });
});

router.get('/groups', function(req, res, next) {

  Group.find().populate('user')
        .exec(function(err, groups){
                if(err){ return next(err)}
                res.json(groups)})
      });


router.post('/login', function(req, res, next){

  if(!req.body.phoneNum || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

// router.get('/recordings', function(req, res, next) {
//   Post.find(function(err, recordings){
//     if(err){ return next(err); }

//     res.json(recordings);
//   });
// });

// router.post('/posts', function(req, res, next) {
//   var post = new Post(req.body);

//   console.log(req.user);

//   post.save(function(err, post){
//     if(err){ return next(err); }

//     res.json(post);
//   });
// }); 

// router.param('post', function(req, res, next, id) {
//   var query = Post.findById(id);

//   query.exec(function (err, post){
//     if (err) { return next(err); }
//     if (!post) { return next(new Error('can\'t find post')); }

//     req.post = post;
//     return next();
//   });
// });

// router.param('comment', function(req, res, next, id) {
//   var query = Comment.findById(id);

//   query.exec(function (err, comment){
//     if (err) { return next(err); }
//     if (!comment) { return next(new Error('can\'t find comment')); }

//     req.comment = comment;
//     return next();
//   });
// });

// router.post('/posts/:post/comments', function(req, res, next) {
//   var comment = new Comment(req.body);
//   comment.post = req.post;

//   comment.save(function(err, comment){
//     if(err){ return next(err); }

//     req.post.comments.push(comment);
//     req.post.save(function(err, post) {
//       if(err){ return next(err); }

//       res.json(comment);
//     });
//   });
// });

// router.get('/posts/:post', function(req, res, next) {
//   req.post.populate('comments', function(err, post) {
//     if (err) { return next(err); }

//     res.json(post);
//   });
// });

// router.put('/posts/:post/upvote', function(req, res, next) {
//   req.post.upvote();


//   req.post.save(function(err, post) {
//     res.json(post);
//   });
// });

// router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
//   req.comment.upvote();

//   req.comment.save(function(err, comment) {
//     res.json(comment);
//   });
// });

module.exports = router;