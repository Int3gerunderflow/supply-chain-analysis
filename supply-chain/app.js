require('express-async-errors')
require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const mysql = require("mysql")
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
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'supplyschema'
});
connection.connect()

connection.query('SELECT * FROM users', (err, rows, fields) => {
  if (err) throw err

  console.log(rows)
})

app.listen(port, console.log(`server is up and running on port ${port}`));

module.exports = app;
