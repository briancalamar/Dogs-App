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
    let { name: n, page, o, fs, ft } = req.query;
    if (page === "undefined" || page <= 0 || !page) page = 1;
    if (n === "undefined") n = undefined;
    if (o === "undefined") o = undefined;
    if (fs === "undefined") fs = undefined;
    if (ft === "undefined") ft = undefined;
    let spliceMin = 8 * (page - 1);
    let spliceMax = (page * 8)

    let { data } = await axios.get(`https://api.thedogapi.com/v1/breeds${API_KEY}`);

    let dataApi = refactorData(data, "limited")

    let dataBd = await Dog.findAll({
        attributes: ['id', 'name', 'image', 'weight'],
        include: Temperament,
    })

    dataBd = refactorData(dataBd, "limited")

    newdata = [...dataApi, ...dataBd];

    
    if (ft !== undefined) return res.json(newdata)
    
    if (n) {
        newdata = newdata.filter(e => e.name.toLowerCase().includes(n.toLocaleLowerCase()))
        if(newdata.length === 0) return res.json([{error: "Dog Not Found"}])
    }
    
    if(fs){
        fs = fs.toLowerCase();
        if(fs === "api") newdata = [...dataApi]
        else if(fs === "bd") newdata = [...dataBd]
    }
    
    if (o) newdata = orderData(newdata, o)

    res.json(newdata.slice(spliceMin, spliceMax))
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


