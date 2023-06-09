var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 4A. Khai báo router tùy biến
var studentRouter = require('./routes/student');
var lecturerRouter = require('./routes/lecturer');
var subjectRouter = require('./routes/subject');

var app = express();

var mongoose = require('mongoose');
// console.log("Mongoose version: " + mongoose.version);
// Note: Cần khai báo DB name trong database uri
var uri = "mongodb://127.0.0.1:27017/gch1101";
var cloud = "mongodb+srv://mongo:mongo@cluster0.cdadmxu.mongodb.net/gch1101"
mongoose.connect(cloud)
  .then(() => { console.log("Connect to DB to succeed!") })
  .catch(() => { console.err(err) });

//2. body-parser: lấy dữ liệu từ form
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Sử dụng helper "equal" để so sánh
var hbs = require('hbs');
hbs.registerHelper('equal', require('handlebars-helper-equal'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// 4B. Sử dụng router tùy biến
app.use('/student', studentRouter);
app.use('/lecturer', lecturerRouter);
app.use('/subject', subjectRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 3. set port để chạy trên hosting 
var port = process.env.PORT || 3001;
app.listen(port);

module.exports = app;
