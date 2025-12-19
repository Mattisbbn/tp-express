var createError = require('http-errors');
var express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const navItemsJson = require('./assets/json/nav-items.json')
const { isAdmin } = require('./middlewares/AuthMiddleware')

var app = express();

app.use(cors());

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
}))

app.use((req, res, next) => {
  res.locals.isLogged = req.session.isLogged || false
  res.locals.login = req.session.login || null
  res.locals.uri = req.originalUrl
  res.locals.navItems = navItemsJson
  next()
})

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const chatRouter = require('./routes/chat');
const dashboardRouter = require('./routes/dashboard')



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/base-layout');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/admin/dashboard',isAdmin, dashboardRouter);
app.use('/chat', chatRouter);


app.use(function(req, res, next) {
  res.render('pages/404',{title:"Erreur 404",layout:false});
  createError(404)
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;