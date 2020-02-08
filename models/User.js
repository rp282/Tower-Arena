const mongoose = require('mongoose');
const Champion = require('./Champion');

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
    },
    'gold keys': {
        type: Number,
        default: 25
    },
    champions: {
        type: [{
            name: {
                type: String,
                required: true
            },
            race: {
                type: String,
                required: true
            },
            class: {
                type: String,
                required: true
            },
            tier: {
                type: Number,
                default: 1
            },
            level: {
                type: Number,
                default: 1
            },
            attack: {
                type: Number,
                default: 1
            },
            health: {
                type: Number,
                default: 10
            },
            defense: {
                type: Number,
                default: 1
            },
            speed: {
                type: Number,
                default: 1
            },
            crit: {
                type: Number,
                default: 0
            },
            dodge: {
                type: Number,
                default: 0
            }
        }]
    }    
})

const User = mongoose.model('User', UserSchema);

module.exports = User;

/*
owned: [{
            name: {
                type: String,
                required: true
            },
            race: {
                type: String,
                required: true
            },
            class: {
                type: String,
                required: true
            },
            tier: {
                type: Number,
                default: 1
            },
            level: {
                type: Number,
                default: 1
            },
            attack: {
                type: Number,
                default: 1
            },
            health: {
                type: Number,
                default: 10
            },
            defense: {
                type: Number,
                default: 1
            },
            speed: {
                type: Number,
                default: 1
            },
            crit: {
                type: Number,
                default: 0
            },
            dodge: {
                type: Number,
                default: 0
            }
        }]
*/