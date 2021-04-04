const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: String,
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'developer'
    }
})

const Game = mongoose.model("game", gameSchema, "games");

module.exports = Game