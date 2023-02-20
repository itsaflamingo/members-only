const express = require('express');
const router = express.Router();

/* GET user */
router.get('/', function(req, res, next) {
  res.render('log-in', { title: 'Log In' });
});

module.exports = router;
