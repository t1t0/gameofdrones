const express = require('express');
const router = express.Router();


// Player Model
const Player = require('../models/players');

// @route   GET api/players
// @desc    Get All players
router.route('/').get(async(req, res) => {
    Player.find().sort({ wons: -1 }).limit(10)
        .then(player => res.json(player))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST api/players
// @desc    Create a new Player
router.route('/').post(async(req, res) => {
    const name = req.body.name;
    const wons = req.body.wons;
    const losts = req.body.losts;

    const newPlayer = new Player({name, wons, losts});

    newPlayer.save()
        .then(() => res.json('Player added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   GET api/players/:id
// @desc    Get one Player
router.route('/:id').get(async(req, res) => {
    Player.findById(req.params.id)
        .then(player => res.json(player))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   DELETE api/players/:id
// @desc    Remove one Player
router.route('/:id').delete(async(req, res) => {
    Player.findById(req.params.id)
        .then(item => item.remove())
        .then(()=>res.json('Player deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   PUT api/players
// @desc    Modify one Player
router.route('/:id').put(async(req, res) => {
    const {name, wons, losts} = req.body;
    const newPlayer = {name, wons, losts};

    await Player.findByIdAndUpdate(req.params.id, newPlayer);
    res.json('Player updated!');
});


module.exports = router;