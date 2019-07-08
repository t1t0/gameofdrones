const express = require('express');
const router = express.Router();


// Player Model
const Player = require('../models/moves');

router.route('/').get(async(req, res) => {
    Player.find()
        .then(moves => res.json(moves))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST api/players
// @desc    Create a new Player
router.route('/').post(async(req, res) => {
    const move = req.body.move;
    const kills = req.body.kills

    const newMoves = new Player({move, kills});

    newMoves.save()
        .then(() => res.json('Rules added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   GET api/players/:id
// @desc    Get one Player
router.route('/:id').get(async(req, res) => {
    Move.findById(req.params.id)
        .then(moves => res.json(moves))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   DELETE api/players/:id
// @desc    Remove one Player
router.route('/:id').delete(async(req, res) => {
    res.json(req.param.id);
    await Move.findByIdAndRemove(req.params.id)
        .then(()=>res.json('Rules deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   PUT api/players
// @desc    Modify one Player
router.route('/:id').put(async(req, res) => {
    const {move} = req.body.move;
    const {kills} = req.body.kills;
    const newMove = {move, kills};

    await Move.findByIdAndUpdate(req.params.id, newMove);
    res.json('Rules updated!');
});


module.exports = router;