const express = require('express')
const app = express()
require('dotenv').config()
const createError = require('http-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const flash = require('connect-flash')
const expressValidator = require('express-validator')
const expressSession = require('express-session')
const hbs = require('express-handlebars')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(expressSession)
require('./config/passport')(passport)
require('./config/facebook-passport')(passport)
require('./config/google-passport')(passport)

const {
  DB_PASS,
  DB_USER,
  DB_URI
} = process.env

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URI}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ValidationExpress'
  })

// view engine setup
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(expressValidator())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(expressSession({
  secret: 'max',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// routes includes
require('./app/routes/index')(app, passport)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : { }

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
