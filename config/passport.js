const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User.js');

module.exports = function(passport) {    
    passport.use(
        new LocalStrategy({ usernameField: 'emailL', passwordField: 'passwordL'}, (emailL, passwordL, done) => {            
            // Match User
            User.findOne({ 
                email: emailL 
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'No account with that email'});                    
                }
                
                // Match User
                bcrypt.compare(passwordL, user.password, (err, isMatch) => {
                    if (err) {
                        throw err;
                    }

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Incorrect password'});
                    }
                })
            })
            .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};