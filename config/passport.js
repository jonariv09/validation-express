const LocalStrategy = require('passport-local').Strategy

const User = require('../app/models/User') 

module.exports = function(passport) {
  
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    try {
      const user = User.findById(id)
      done(null, user)
    } catch(error) {
      done(error, null)
    }
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    process.nextTick(() => {
      User.findOne({ 'local.username': email }, (err, user) => {
        if(err) { return done(err) }
        if(user)
          return done(null, false, req.flash('signupMessage', 'error'))
        else {
          let newUser = new User()
          newUser.local.username = email
          newUser.local.password = password
          
          newUser.save((err) => {
            if(err) { throw(err) }
            return done(null, newUser, req.flash('signupMessage', 'success'))
          })
        }
      })
    })
  }))

}
