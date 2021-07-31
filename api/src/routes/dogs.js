require('dotenv').config();
const express = require('express');
const { Router } = require('express');
const axios = require('axios').default;
const { Dog, Temperament } = require('../db');
const { refactorData, orderData } = require('../functions/dogs')
const { API_KEY } = process.env;

const router = Router();

// Middlewares;
router.use(express.json())


// Appointments

router.get('/', async (req, res) => {
    
    try {
        let { name, page, order, creator, temperament } = req.query;
        if (page <= 0) page = 1;
        let spliceMin = 8 * (page - 1);
        let spliceMax = (page * 8)
        console.log(name, page, order, creator)
        
        let { data } = await axios.get(`https://api.thedogapi.com/v1/breeds${API_KEY}`);
        return res.json(data)
        
        let dataApi = refactorData(data, "limited")
        
        let dataBd = await Dog.findAll({
            attributes: ['id', 'name', 'image', 'weight'],
            include: Temperament,
        })
        
        dataBd = refactorData(dataBd, "limited")
        
        newdata = [...dataApi, ...dataBd];
        
        
        if (name) {
            newdata = newdata.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase()))
            if(newdata.length === 0) return res.json([{error: "Dog Not Found"}])
            else return res.json(newdata.slice(spliceMin, spliceMax))
        }
        
        if(creator){
            creator = creator.toLowerCase();
            if(creator === "api") newdata = [...dataApi]
            else if(creator === "bd") newdata = [...dataBd]
        }
        
        // if (temperament) return res.json(newdata)
        if (order) newdata = orderData(newdata, order)
        
        res.json(newdata.slice(spliceMin, spliceMax))
    } catch (error) {
        console.log(error)
    }
})

router.get('/:idRaza', async (req, res) => {
    let { idRaza } = req.params;
    idRaza = parseInt(idRaza)
    
    try {
        if (idRaza <= 999) {
            let { data } = await axios.get(`https://api.thedogapi.com/v1/breeds${API_KEY}`);
            let raza = await data.find( e => e.id === idRaza)
            if (raza) return res.json(refactorData(raza, "extended"))
        } else {
            let raza = await Dog.findOne({
                where: { id: idRaza },
                include: Temperament,
            })
            if (raza) return res.json(refactorData(raza, "extended"))
        }
        res.json({ raza: false })

    } catch (error) {
        res.json([{error: "Breed Not Found"}])
    }


})


module.exports = router;


