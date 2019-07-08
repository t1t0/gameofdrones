const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moveSchema = new Schema({
    move: String,
    kills: [String]
});

const Move = mongoose.model('Move', moveSchema);

module.exports = Move;