var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('sign-up', { title: 'Sign Up' });
});

module.exports = router;
