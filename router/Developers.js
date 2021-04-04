const express = require('express')
const router = express.Router()

const Dev = require('../models/developer')

    router.get('/', async (req, res) => {

        try {
            const arrayDevs = await Dev.find({});
            console.log(arrayDevs);
            res.render("devs", {
                arrayDevs
            })
        } catch (error) {
            console.log(error);
        }

    })

module.exports = router;