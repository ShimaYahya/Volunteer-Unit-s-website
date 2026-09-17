var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminsRouter = require('./routes/admins');
var execution_typeRouter = require('./routes/execution_type');
var projectsRouter = require('./routes/projects');
var citiesRouter = require('./routes/cities');
var countriesRouter = require('./routes/countries');
var newsRouter = require('./routes/news');
var yemenipepoleRouter = require('./routes/yemenipepole');




var app = express();

app.use(cors());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admins', adminsRouter);
app.use('/execution_type', execution_typeRouter);
app.use('/projects', projectsRouter);
app.use('/cities', citiesRouter);
app.use('/countries', countriesRouter);
app.use('/news', newsRouter);
app.use('/yemenipepole', yemenipepoleRouter);




app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const { sequelize } = require('./models');

sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced");
  })
  .catch(err => console.error("❌ Sync error:", err));
