var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MakeReddit' });
});

// login
router.post('/login', (req, res, next) => {
  console.log('logging in!');
  console.log(req.body);

  res.redirect('/');
});

module.exports = router;