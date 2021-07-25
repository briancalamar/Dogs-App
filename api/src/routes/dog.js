require('dotenv').config();
const express = require('express');
const { Router } = require('express');
const { Dog } = require('../db');


const router = Router();

//Middlewares
router.use(express.json())


//Appointments

router.post('/', async (req, res) => {
    let { 
        name, 
        heightMin, 
        heightMax, 
        weightMin,
        weightMax, 
        life_span, 
        image,
        temperaments
    } = req.body;

    if (temperaments?.length !== 0) {
        temperaments = temperaments.map( e => {
            e = e.split("|")
            return parseInt(e[1])
        })
    }

    try {  
        let newDog = await Dog.findAll({
            where:{ name }
        })
    

        if(newDog.length === 0) {
            newDog = await Dog.create({
                name,
                height: `${heightMin} - ${heightMax}`,
                weight:`${weightMin} - ${weightMax}`,
                life_span: `${life_span} years`,
                image
            })
    
            await newDog.addTemperament(temperaments);
            return res.json({created:true})
        }
        newDog.unshift({created:false})
    
        res.json(newDog)
    } catch (error) {
        res.status(400).json({problem: "check data sended"})
    }
    
  })
  

module.exports = router;
