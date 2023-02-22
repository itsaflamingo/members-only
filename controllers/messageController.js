const Message = require('../models/message');
const { body, validationResult, check } = require('express-validator')
const async = require('async');

exports.create_message = [
    body('message')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Message has to include at least one character'),
    (req, res, next) => {
        const errors = validationResult(req);
        
        const message = new Message({
            message: req.body.message,
            user: req.user
        })
        .save(err => {
            if(err) {
                return next(err);
            }
        })
    }
]