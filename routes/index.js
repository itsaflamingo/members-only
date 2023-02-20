var express = require('express');
var router = express.Router();

// Import controller modules
const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/log-in');
});

// USER ROUTES
router.get("/sign-up", user_controller.user_create_get);
router.post("/sign-up", user_controller.user_create_post);

module.exports = router;
