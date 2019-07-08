const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
    },
    wons: Number,
    losts: Number
},
{
    timestamps: true,
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;