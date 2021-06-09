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
        image
    } = req.body;
  
    let [newDog, created] = await Dog.findOrCreate({
        where:{
            name,
            height: `${heightMin} - ${heightMax}`,
            weight:`${weightMin} - ${weightMax}`,
            life_span
        },
        // default: {
        //     name,
        //     height: `${heightMin} - ${heightMax}`,
        //     weight:`${weightMin} - ${weightMax}`,
        //     life_span,
        //     image
        // }
    })
    if(created) await newDog.addTemperament([20, 10, 5]);
    res.sendStatus(200)
  })
  

module.exports = router;