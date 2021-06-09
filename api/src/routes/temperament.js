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

    let { data } = await axios.get(`https://api.thedogapi.com/v1/breeds${API_KEY}`)

    let newinfo = []
    data.map(e => {
        let { temperament } = e;
        if (temperament) {
            let array = temperament.split(",")
            array.map(e => newinfo.push(e.trim()))
        }

    })
    newinfo = Array.from(new Set(newinfo))


    // res.json(newinfo)
    newinfo.forEach( async (e) => {
        await Temperament.create({
            name: `${e}`,
        })
    })
    res.send({respuesta: "todo joya"})
})


module.exports = router;