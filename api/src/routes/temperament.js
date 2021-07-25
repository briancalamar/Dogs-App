require('dotenv').config();
const express = require('express');
const { Router } = require('express');
<<<<<<< HEAD
const { Temperament } = require('../db');
=======
const axios = require('axios').default;
const { Dog, Temperament } = require('../db');
const { Op } = require('sequelize'); 
const { API_KEY } = process.env;
const { cargadoBD } = require('../functions')
>>>>>>> 38ea3adc94ba1feef65fcb3145c71c504c979c7e

const router = Router();

<<<<<<< HEAD
//Middlewares
router.use(express.json())


//Appointments
=======
const router = Router();

router.use(express.json())
>>>>>>> 38ea3adc94ba1feef65fcb3145c71c504c979c7e

router.get('/', async (req, res) => {
    try {
        let temperaments = await Temperament.findAll()
        res.json(temperaments)
    } catch (error) {
        console.log(error.data)
    }


})


module.exports = router;