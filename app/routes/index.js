
module.exports = (app, passport) => {
  app.use('/', require('./main/index'))
  app.use('/session', require('./login/index')(passport))
  app.use('/auth/facebook', require('./oauth/facebook-route')(passport))
  app.use('/auth/google', require('./oauth/google-route')(passport))
  app.use('/users', require('./users/index'))


  app.get('/connect/local', function(req, res) {
    res.render('connect-local', req.flash('signupMessage'))
  })

  app.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/session/profile',
    failureRedirect: '/success',
    failureFlash: true
  }))

  app.get('/connect/facebook', passport.authorize('facebook', { scope: ['email', 'user_photos', 'user_gender', 'user_link'] }))

  app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }))
  
  app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/session')
  })
}