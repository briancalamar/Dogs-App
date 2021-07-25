require('dotenv').config();
const express = require('express');
const { Router } = require('express');
const { Temperament } = require('../db');

const router = Router();

//Middlewares
router.use(express.json())


//Appointments

router.get('/', async (req, res) => {
    try {
        let temperaments = await Temperament.findAll()
        res.json(temperaments)
    } catch (error) {
        console.log(error.data)
    }


})


module.exports = router;