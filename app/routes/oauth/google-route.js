


module.exports = (passport) => {

  const router = require('express').Router();

  router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }))

  router.get('/callback', passport.authenticate('google', {
    successRedirect: '/session/profile',
    failureRedirect: '/session'
  }))

  
  return router
}
