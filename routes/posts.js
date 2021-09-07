const express = require('express');
const router = express.Router({mergeParams: true});
const auth = require('./helpers/auth');
const Room = require('../models/room');

// Posts new
router.get('/new', auth.requireLogin, (req, res, next) => {
  // TODO
});

// Posts create
router.post('/', auth.requireLogin, (req, res, next) => {
  // TODO
})

module.exports = router;