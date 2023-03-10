var createError = require('http-errors');
var express = require('express');
var path = require('path');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const session = require("express-session");
const User = require('./models/user');
const bcrypt = require('bcryptjs');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
const signUpRouter = require('./routes/sign-up');
const loginRouter = require('./routes/log-in');
const chatRouter = require('./routes/chat');

var app = express();
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
mongoose.set('strictQuery', false);

const mongoDB = process.env.URI_KEY;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "cat", resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/sign-up', signUpRouter);
app.use('/log-in', loginRouter);
app.use('/chat', chatRouter);

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      console.log(user);
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          // passwords match! Log user in
          return done(null, user)
        } else {
          // passwords do not match
          return done(null, false, { message: 'Incorrect password' })
        }
      })
    });
  }));

  app.post(
    "/log-in",
    passport.authenticate("local", {
      successRedirect: "/chat",
      failureRedirect: "/sign-up"
    })
  );

passport.serializeUser(function(user, done) {
  done(null, user.id);
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
