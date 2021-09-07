const express = require('express');
const router = express.Router({mergeParams: true});
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

module.exports = router;