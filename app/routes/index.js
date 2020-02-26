
module.exports = (app, passport) => {
  app.use('/', require('./main/index'))
  app.use('/session', require('./login/index')(passport))
  app.use('/auth/facebook', require('./oauth/facebook-route')(passport))
  app.use('/users', require('./users/index'))
}



