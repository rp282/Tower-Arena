const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    gold: {
        type: Number,
        default: 1000000
    },
    gems: {
        type: Number,
        default: 20000
    },
    level: {
        type: Number,
        default: 1
    },
    experience: {
        type: Number,
        default: 0
    }    
})

const User = mongoose.model('User', UserSchema);

module.exports = User;