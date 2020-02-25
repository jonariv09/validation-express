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
    profileFields   : ['emails', 'displayName', 'name', 'photos', 'gender', 'profileUrl']
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(() => {
      User.findOne({ "facebook.id": profile.id }, (err, user) => {
        if(err) return done(err)
        if(user)
          return done(null, user)
        else {
          const newUser = new User()
          newUser.facebook.id = profile.id
          newUser.facebook.token = accessToken
          newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName
          newUser.facebook.email = profile.emails[0].value
          
          newUser.save( function(err) {
            if(err) throw err;
            return done(null, newUser)
          })
          
          console.log(profile)

        }
      })
    })
  }
  ));
}


// function (accessToken, refreshToken, profile, done) {
//   User.findOrCreate(..., function (err, user) {
//     if (err) { return done(err); }
//     done(null, user);
//   });
// }