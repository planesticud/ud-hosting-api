const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { 
       CLIENT_ID,
       SECRET,
       CALLBACK_URL,
       GOOGLE_URL_TOKEN,
   } = process.env


const extractProfile = (profile, token) => {
let imageUrl = ''

if (profile.photos && profile.photos.length) {
imageUrl = profile.photos[0].value;
}

return {
id: profile.id,
displayName: profile.displayName,
image: imageUrl,
token,
name: profile.name,
emails : profile.emails,
}
}

passport.use(new GoogleStrategy({
clientID: CLIENT_ID,
clientSecret: SECRET,
callbackURL: CALLBACK_URL,
accessType: 'offline',
userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
},(accessToken, refreshToken, profile, cb) => {
       cb(null, extractProfile(profile, accessToken))
}))

passport.serializeUser((user, cb) => {
          cb(null, user)
})

passport.deserializeUser((obj, cb) => {
          cb(null, obj)
});