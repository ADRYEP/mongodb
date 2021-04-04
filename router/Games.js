const mongoose = require('mongoose');
const express = require('express')
const router = express.Router()

const Game = require('../models/game')
const Dev = require('../models/developer')

    router.get('/', async (req, res) => {

        try {            
            const arrayGames = await Game.find({});

            res.render("games", {
                arrayGames
            })
            
        } catch (error) {
            console.log(error);
        }

    })

router.get('/create', async (req, res) => {

    const arrayDevs = await Dev.find({})
    // console.log(arrayDevs);

    res.render("create", {
        arrayDevs
    })
})

router.post('/', async (req, res) => {
    const body = req.body

    try {
        const game = new Game(body)
        await game.save()

        const dev = await Dev.findById(body.developer);
        dev.games.push(mongoose.Types.ObjectId(game.id))
        dev.save();

        console.log(dev);

        res.redirect("games")

    } catch (error) {
        console.log(error);
    }

})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {

        const gameDB = await Game.findOne({_id: id})
        const arrayDevs = await Dev.find({})
        
        res.render('detail', {
            game: gameDB,
            arrayDevs
        })

    } catch (error) {
        console.log(error);
    }

})

router.delete('/:id', async(req, res) => {
    const id = req.params.id

    try {
        const game = await Game.findOne({_id:id})

        console.log(game.id);

        developer = game.developer

        const dev = await Dev.findOne({_id:developer});
        console.log(`Juegos de ahora:`+dev.games);
        dev.games = dev.games.filter(el => el != game.id)

        console.log('Despues: '+dev.games);

        dev.save()

        const gameDB = await Game.deleteOne({_id:id})

        if (gameDB) {
            res.json({
                state: true
            })
        } else {
            res.json({
                state: false
            })
        }

    } catch (error) {
        console.log(error);
    }
})

router.put('/:id', async (req,res) => {
    const id = req.params.id
    const body = req.body
    
    try {

        console.log(req.body);
        const gameDB = await Game.findByIdAndUpdate(id, body, { useFindAndModify: false})

        res.json({
            state: true
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;