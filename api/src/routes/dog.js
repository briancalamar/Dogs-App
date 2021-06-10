require('dotenv').config();
const { Router } = require('express');
const bodyParser = require('body-parser');
const { Dog } = require('../db');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use(bodyParser.json())

router.post('/', async (req, res) => {
    const { 
        name, 
        heightMin, 
        heightMax, 
        weightMin,
        weightMax, 
        life_span, 
        image,
        temperaments
    } = req.body;
  
    let newDog = await Dog.findAll({
        where:{ name }
    })

    if(newDog.length === 0) {
        newDog = await Dog.create({
            name,
            height: `${heightMin} - ${heightMax}`,
            weight:`${weightMin} - ${weightMax}`,
            life_span,
            image
        })

        await newDog.addTemperament(temperaments);
        return res.json(newDog)
    }
    newDog.unshift({newDog:false})

    res.json(newDog)
  })
  

module.exports = router;