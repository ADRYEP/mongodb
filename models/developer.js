const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
    name: String,
    games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'game'
    }]
})

const Developer = mongoose.model("developer", developerSchema, "developers");

module.exports = Developer