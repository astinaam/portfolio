var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
const Email = require('email-templates');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

const emailing = new Email({
  message: {
    from: 'astinaam@gmail.com'
  },
  send: true,
  transport: {
    jsonTransport: true
  }
});

app.post('/contact',function(req,res){
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  emailing
  .send({
    template: 'form',
    message: {
      to: 'astinaam@yandex.com'
    },
    locals: {
      name: 'Mahmud'
    }
  })
  .then(
    res =>{
      console.log('res.originalMessage', res.originalMessage);
    }
  )
  .catch(console.error);
  res.send({status:"OK"});
});

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
