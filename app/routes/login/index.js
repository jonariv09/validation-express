

module.exports = (passport) => {
  
  const router = require('express').Router()
  const User = require('../../models/User')

  router.get('/', function name(req, res, params) {
    res.render('login', { message: req.flash('signupMessage') })
  })
  
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/login',
    failureFlash: true
  }))

  router.post('/createUser', function (req, res, next) {
    const newUser = new User({
      username: req.params.username,
      password: req.params.password
    })

    newUser
      .save()
      .then(data => {
        res.status(200).json()
        userCreated: newUser
      })
      .catch(err => {
        res.status(500).json({ error: err })
      })
  })

  return router
}

