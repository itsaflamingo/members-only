const express = require('express');
const router = express.Router();

/* GET sign up page. */
router.get('/', function(req, res, next) {
    res.render('sign_up', { title: 'Sign Up' });
  });
  
  module.exports = router;