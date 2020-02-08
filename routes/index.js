const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const User = require("../models/User");
const Champion = require("../models/Champion");

// Welcome Page
router.get("/", (req, res) => res.redirect("/users/login"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  console.log(`User logged in with email ${req.user.email}`);
  res.render("dashboard", {
    user: req.user
  });
});

// Spend gold test
router.post("/dashboard/spendGold", ensureAuthenticated, (req, res) => {
  console.log(`User ${req.user.email} spent 1000 gold`);
  User.updateOne(
    { email: req.user.email },
    { $set: { gold: req.user.gold - 1000 } },
    function(err, res) {
      if (err) throw err;
      console.log(`${req.user.email} gold updated`);
    }
  );
  res.redirect("/dashboard");
});

// Pull chest test
router.post("/dashboard/pullChest", ensureAuthenticated, (req, res) => {
  console.log(`User ${req.user.email} attemped to pull gold champion chest`);
  User.findOne({ email: req.user.email }).then(user => {
    if (user["gold keys"] > 0) {
      console.log("test");
      User.updateOne(
        { email: req.user.email },
        { $set: { "gold keys": req.user["gold keys"] - 1 } },
        function(err, res) {
          if (err) throw err;
          console.log(`${req.user.email} keys updated`);
        }
      );
      Champion.findOne({ name: "Orion" }).then(champion => {
        console.log("found champion:" + champion.name);
        User.updateOne(
          { email: req.user.email },
          { $push: { champions: {
            name: champion.name,
            race: champion.race,
            class: champion.class,
            tier: champion.tier,
            level: champion.level,
            attack: champion.attack,
            health: champion.health,
            defense: champion.defense,
            speed: champion.speed,
            crit: champion.crit,
            dodge: champion.dodge         
          } } },
          function(err, res) {
            if (err) throw err;
            console.log(`${req.user.email} champion pushed`);
          }
        );
      });
    } else {
      req.flash("error_msg", "Insufficient gold keys");
    }
  });
  res.redirect("/dashboard/Shop");
});

router.get("/dashboard/champions", ensureAuthenticated, (req, res) => {
  console.log(req.user);
  res.render("champions", {
    user: req.user
  });
});

router.get("/dashboard/shop", ensureAuthenticated, (req, res) => {
  res.render("shop", {
    user: req.user
  });
});

module.exports = router;
