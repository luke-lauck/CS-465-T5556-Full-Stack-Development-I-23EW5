const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = (req, res) => {
    if (!req.query.name || !req.query.email || !req.query.password) {
        return res.status(400).json({ "message": "All fields required for registration" });
    }
    const user = new User();
    user.name = req.query.name;
    user.email = req.query.email;
    user.setPassword(req.query.password);
    user.save()
        .then(() => {
            const token = user.generateJwt();
            res.status(200).json({ token });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ "message": "All fields required for login" });
    }
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(404).json(err);
        }
        if (user) {
            const token = user.generateJwt();
            res.status(200).json({ token });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};

module.exports = {
    register,
    login
};
