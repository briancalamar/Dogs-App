require('dotenv').config();
const { Router } = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const { Dog, Temperament } = require('../db');
const { Op } = require('sequelize'); 
const { API_KEY } = process.env;
const { cargadoBD } = require('../functions')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use(bodyParser.json())

router.get('/', async (req, res) => {
    try {
        let temperaments = await Temperament.findAll()
        res.json(temperaments)
    } catch (error) {
        console.log(error.data)
    }


})


module.exports = router;