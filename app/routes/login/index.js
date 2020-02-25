

module.exports = (passport) => {
  const router = require('express').Router()

  router.get('/', function name (req, res) {
    res.render('session', { message: req.flash('signupMessage') })
  })

  router.get('/signup', (req, res, next) => {
    res.render('signup', { message: req.flash('singupMessage') })
  })

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/session/profile',
    failureRedirect: '/session/signup',
    failureFlash: true
  }))

  router.get('/login', (req, res, next) => {
    res.render('login', { message: req.flash('signupMessage') })
  })

  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/session/profile',
    failureRedirect: '/session/login',
    failureFlash: true
  }))

  function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) { return next() }
    res.redirect('/login')
  }

  router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { user: req.user })
  })

  return router
}


