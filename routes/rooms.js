const express = require('express');
const router = express.Router();

const auth = require('./helpers/auth');
const Room = require('../models/room');

// Rooms index
router.get('/', (req, res, next) => {
    Room.find({}, 'topic', function(err, rooms) {
      if(err) {
        console.error(err);
      } 
      else {
        res.render('rooms/index', { rooms: rooms });
      }
    });
});

// Rooms new
router.get('/new', auth.requireLogin, (req, res, next) => {
    res.render('rooms/new');
});

// Rooms show
router.get('/:id', auth.requireLogin, (req, res, next) => {
    Room.findById(req.params.id, function(err, room) {
      if(err) { console.error(err) };
  
      res.render('rooms/show', { room: room });
    });
});

// Rooms edit
router.get('/:id/edit', auth.requireLogin, (req, res, next) => {
  // TODO
});

// Rooms update
router.post('/:id', auth.requireLogin, (req, res, next) => {
  // TODO
});

// Rooms create
router.post('/', auth.requireLogin, (req, res, next) => {
    let room = new Room(req.body);
  
    room.save(function(err, room) {
      if(err) { console.error(err) };
  
      return res.redirect('/rooms');
    });
});

module.exports = router;