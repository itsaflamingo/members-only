var express = require('express');
var router = express.Router();
const Message = require('../models/message');

/* GET home page. */
router.get('/', function(req, res, next) {
    Message.find({}, 'user message timestamp')
        .sort({ timestamp: 1 })
        .populate('user')
        .exec(function(err, list_messages) {
            if(err) {
                return next(err)
            }
            res.render('chat', { title: 'Chat', user: req.user, message_list: list_messages });
        })
});

module.exports = router;
