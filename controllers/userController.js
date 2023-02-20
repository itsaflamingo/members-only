const User = require('../models/user');
const async = require('async');
const { body, validationResult } = require('express-validator');

exports.user_list = (req, res, next) => {
    User.find({}, 'first_name last_name')
        .sort({ name: 1 })
        exec(function(err, list_user) {
            if(err) {
                return next(err);
            }
            res.render('user_list', { title: 'List of Users', user_list: list_user})
        })
}

exports.user_create_get = (req, res, next) => {
    res.render('sign-up', { title: "Sign Up" });
}

// Sign up
exports.user_create_post = (req, res, next) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password
    }).save(err => {
        console.log(res);
        if(err) {
            return next(err);
        }
        res.redirect('/');
    })
}