const mongoose = require('mongoose');

const ChampionSchema = new mongoose.Schema({
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
})

const Champion = mongoose.model('Champion', ChampionSchema);

module.exports = Champion;