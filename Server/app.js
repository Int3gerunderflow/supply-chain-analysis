require('express-async-errors')
require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
//importing the routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const supplyRouter = require('./routes/supplyChainPosts');

const app = express();

//setting up middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors("*"))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', supplyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json(err);
});

const port = 8000

app.listen(port, console.log(`server is up and running on port ${port}`));

module.exports = app;
