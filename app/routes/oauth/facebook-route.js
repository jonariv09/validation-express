

module.exports = (passport) => {

  const router = require('express').Router()

  router.get('/', passport.authenticate('facebook', { scope: ['email', 'user_photos', 'user_gender', 'user_link'] }))

  router.get('/callback', passport.authenticate('facebook', {
    successRedirect: '/session/profile',
    failureRedirect: '/session/'
  }))

  return router
}