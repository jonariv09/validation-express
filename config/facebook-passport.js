const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../app/models/User')

const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET
} = process.env

module.exports = (passport) => {
  
  passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields   : ['emails', 'displayName', 'name', 'photos', 'gender', 'profileUrl'],
    passReqToCallback: true
  },
  function (req, accessToken, refreshToken, profile, done) {
    process.nextTick(() => {
      if(!req.user) {

        User.findOne({ "facebook.id": profile.id }, (err, user) => {
          if(err) return done(err)
          if(user)
            return done(null, user)
          else {
            const newUser = new User({
              'facebook.id': profile.id,
              'facebook.token': accessToken,
              'facebook.name': profile.displayName,
              'facebook.email': profile.emails[0].value
            })
            
            
            newUser.save( function(err) {
              if(err) throw err;
              return done(null, newUser)
            })
          }
        })
      } else {

        const user = req.user
        user.facebook.id = profile.id
        user.facebook.token = accessToken
        user.facebook.name = profile.displayName
        user.facebook.email = profile.emails[0].value
        
        user.save(function(err) {
          if(err)
            throw err
          return done(null, user)
        })

      }
    })
  }
  ));
}
