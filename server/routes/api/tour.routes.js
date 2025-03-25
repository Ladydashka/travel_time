const router = require('express').Router();
const { Tour} = require('../../db/models');

router.post('/', (req, res) => {

});

router.get('/', async (req, res) => {
    const excursions = await Tour.findAll();
    res.status(201).json(excursions)
});

module.exports = router;
