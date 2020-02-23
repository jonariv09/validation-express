
module.exports = (app, passport) => {
  app.use('/login', require('./login/index')(passport))
  app.use('/users', require('./users/index'))
}

// let router = require('express').Router()

//   const loginRoute = require('./login/index')

//   router.get('/', function (req, res, next) {
//     res.render('index', { title: 'NodeJs - Express' })
//   })



  // router.use('/login', loginRoute)(app, passport)

  // app.get('/signup', function name(req, res, params) {
  //   res.render('login', { message: req.flash('signupMessage') })
  // })

  // app.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect: '/signup',
  //   failureRedirect: '/signup',
  //   failureFlash: true
  // }))

  // app.post('/createUser', function (req, res, next) {
  //   const newUser = new User({
  //     username: req.params.username,
  //     password: req.params.password
  //   })

  //   newUser
  //     .save()
  //     .then(data => {
  //       res.status(200).json()
  //       userCreated: newUser
  //     })
  //     .catch(err => {
  //       res.status(500).json({ error: err })
  //     })
  // })
