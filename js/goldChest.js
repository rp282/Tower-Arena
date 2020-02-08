const mongoose = require('mongoose');
const User = require('../models/User');
const Champion = require('../models/Champion');

function goldPull(user) {
    const roll = Math.random();
    console.log(`${user.email} rolled ${roll}`);
}

module.exports = goldPull;