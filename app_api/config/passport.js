const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
    User.findOne({email: username}).then(user => {
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });

    /*
    The class wants this to be it but err happens everytime!!!
    I cannot for the life of me figure out what is wrong with err
    and got no clue on why (err, user) is in here to begin with.
    It doesn't follow any of the documentation and fixing this problem
    has taken many days!!  >:(

    User.findOne({ email: username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
    */
}));
