const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')
const User = require('../models/User');

// Login page
router.get('/login', (req, res) => res.render('login'));
router.get('/login.js', (req, res) => res.sendFile(__dirname + '/scripts' + '/login.js'));
router.get('/loginstyle.css', (req, res) => res.sendFile(__dirname + '/styles' + '/loginstyle.css'));

router.get('/register', (req, res) => res.render('login'));

// Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Register handle
router.post('/register', (req, res) => {
  console.log(req.body);
  const { nameR, emailR, passwordR } = req.body;
  User.findOne({ email: emailR })
  .then(user => {
    if(user) {
      // change to rerender register page
      res.send('User exists');
    } else {
      const newUser = new User({
        name: nameR,
        email: emailR,
        password: passwordR
      });

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // Set password to hashed
          newUser.password = hash;
          newUser.save()
          .then(user => {
            console.log(`New user (${newUser.name}) created with email: ${newUser.email}`);
            req.flash('success_msg', `Successfully registered with email ${newUser.email}`);
            res.redirect('/users/login');
          })
          .catch(err => {
            console.log(err);
          })
        })
      });
    }
  });
});

// Logout Handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Successfully logged out');
  res.redirect('/users/login');
})

module.exports = router;
