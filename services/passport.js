const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const Users = mongoose.model("users"); // re-presents model class which can be used to talk to mongoDB collection

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      done(error);
      console.error(error);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      Users.findOne({ googleId: profile.id })
        .then(exisitingUser => {
          if (exisitingUser) {
            //user already exists
            done(null, exisitingUser); // callback function
          } else {
            new Users({ googleId: profile.id })
              .save()
              .then(newUsers => {
                done(null, newUsers);
              })
              .catch(error => {
                done(error);
                console.error(error);
              });
          }
        })
        .catch(error => {
          done(error);
          console.error(error);
        }); //find one where google
      console.log("access token::", accessToken);
      console.log("refreshToken::", refreshToken);
      console.log("profile ::", profile);
    }
  )
); //new instance of google passport strategy can pass config in constructor
