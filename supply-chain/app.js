const createError = require('http-errors');
const express = require('express');
const sql = require("mssql")
require('express-async-errors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

const port = 8000

//connecting to database
const config = {
  "user": "  ", 
  "password": "  ", 
  "server": "  ", 
  "database": "Training", 
  "options": {
      "encrypt": false 
  }
}
app.listen(port, console.log(`server is up and running on port ${port}`));

module.exports = app;
