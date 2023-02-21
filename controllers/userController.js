const User = require('../models/user');
const async = require('async');
const { body, validationResult, custom, check } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.user_create_get = (req, res, next) => {
    res.render('sign-up', { title: "Sign Up" });
}

// Sign up
exports.user_create_post = [
    body('first_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('First name must be specified')
        .isAlphanumeric()
        .withMessage('First name has non-alphanumeric characters'),
    body('last_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Last name must be specified')
        .isAlphanumeric()
        .withMessage('Last name has non-alphanumeric characters'),
    body('username')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Username must be specified')
        .isAlphanumeric()
        .withMessage('Username has non-alphanumeric characters'),
    body('password')
        .trim()
        .isLength({ min: 2 })
        .escape()
        .withMessage('Password must be specified'),
    check(
        'confirm_password',
        'confirm password must have the same value as password field'
        )
        .exists()
        .custom((value, { req }) => value === req.body.password),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.render('sign-up', {
                title: 'Sign Up',
                errors: errors.array()
            });
        }
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if(err) {
                return console.log(err);
            }
            // Else add new user to db
            const user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: hashedPassword,
                confirm_password: req.body.confirm_password,
                membership_status: 'Member'
            }).save(err => {
                if(err) {
                    return next(err);
                }
                res.render('chat', { user: req.body });
            })
        })    
    }
]