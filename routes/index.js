const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');

// Welcome Page
router.get('/', (req, res) =>  res.render('welcome'));
// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  console.log(`User logged in with email ${req.user.email}`);
  console.log(req.user);
  res.render('dashboard', {
    user: req.user
  });
});

// Spend gold test
router.post('/dashboard/spendGold', ensureAuthenticated, (req, res) => {
  console.log(`User ${req.user.email} spent 1000 gold`);
  User.updateOne(
    { email: req.user.email },
    { $set: {gold: (req.user.gold-1000) } },
    function(err, res) {
      if (err) throw err;
      console.log(`${req.user.email} gold updated`);      
    }
  )
  res.redirect('/dashboard')
});

router.get('/dashboard/champions', ensureAuthenticated, (req, res) => {
  res.render('champions', {

  })
});

router.get('/dashboard/shop', ensureAuthenticated, (req, res) => {
  res.render('shop', {
    
  })
});

module.exports = router;
