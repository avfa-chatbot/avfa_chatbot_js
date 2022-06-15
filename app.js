var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var accountsRouter = require('./routes/accounts');
var intentsRouter = require('./routes/intents');

var appParams = require('./appParams');

var app = express();

// mongodb connection
var mongoConnected = false;
mongoConnect = async() => {
  await mongoose.connect(appParams.mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
      .then((data) => {
          mongoConnected = true;
          console.log("mongodb connected to localhost !");
      }).catch((err) => {
          console.log(err)
          console.log("trying mongodb_url_docker ...");
      })

  if (!mongoConnected) {
      await mongoose.connect(appParams.mongodb_url_docker, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
          .then((data) => {
              mongoConnected = true;
              console.log("mongodb connected to mongo docker container !");
          }).catch((err) => {
              console.log(err)
          })
  }
}
mongoConnect();

//session
const application_secret = 'chatbot_avfa_application_secret';
app.use(session({
    secret: application_secret,
    resave: false,
    saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/accounts', accountsRouter);
app.use('/intents', intentsRouter);

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
