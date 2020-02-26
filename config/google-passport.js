const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../app/models/User')

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} = process.env

module.exports = (passport) => {

  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
    function (token, tokenSecret, profile, done) {
      process.nextTick(() => {
        User.findOne({ 'googlee.id': profile.id }, (err, user) => {
          if(err) return done(err)
          if(user)
            return done(null, user)
          else {
            const newUser = new User({
              'google.id': profile.id,
              'google.token': token,
              'google.email': profile.emails[0].value,
              'google.name': profile.displayName
            })

            newUser.save( err => {
              if (err) throw err
              return done(null, newUser)
            })
          }
        })
      })
    }
  ));

}

