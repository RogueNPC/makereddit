const express = require('express');
const router = express.Router({mergeParams: true});

// Add this line to require the Comments controller
const comments = require('./comments');
const auth = require('./helpers/auth');
const Room = require('../models/room');
const Post = require('../models/post');

// Posts new
router.get('/new', auth.requireLogin, (req, res, next) => {
    Room.findById(req.params.roomId, function(err, room) {
        if(err) { console.error(err) };
    
        res.render('posts/new', { room: room });
    });
});

// Posts create
router.post('/', auth.requireLogin, (req, res, next) => {
    Room.findById(req.params.roomId, function(err, room) {
        if(err) { console.error(err) };
    
        let post = new Post(req.body);
        post.room = room;
    
        post.save(function(err, post) {
          if(err) { console.error(err) };
    
          return res.redirect(`/rooms/${room._id}`);
        });
    });
})

// Posts voting
router.post('/:id', auth.requireLogin, (req, res, next) => {
    Post.findById(req.params.id, function(err, post) {
        post.points += parseInt(req.body.points);
    
        post.save(function(err, post) {
            if(err) { console.error(err) };
    
            return res.redirect(`/rooms/${post.room}`);
        });
    });
});

// Add this line to nest the routes
router.use('/:postId/comments', comments)

module.exports = router;