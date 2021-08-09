require('dotenv').config();
const express = require('express');
const { Router } = require('express');
// const axios = require('axios').default;
const { Dog, Temperament } = require('../db');
const { orderData, refactorData } = require('../functions/dogs')
// const { API_KEY } = process.env;

const router = Router();

// Middlewares;
router.use(express.json())


// Appointments
router.get('/', async (req, res) => {

    try {
        let { name, page, order, temperament } = req.query;
        if (page <= 0 || page === "undefined" || !page) page = 1;
        let spliceMin = 8 * (page - 1);
        let spliceMax = (page * 8)

        let dogsDb = await Dog.findAll({
            attributes: ['uuid', 'name', 'image', 'weight', 'height', 'life_span'],
            include: Temperament,
        })

        if (name && name !== "undefined") {
            dogsDb = dogsDb.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))

            if (dogsDb.length === 0) return res.json([{ error: "Dog Not Found" }])
            else return res.json(dogsDb.slice(spliceMin, spliceMax))
        }
        if (temperament && temperament !== "undefined") return res.json(dogsDb)
        if (order && order !== "undefined") dogsDb = orderData(dogsDb, order)


        dogsDb = await refactorData(dogsDb.slice(spliceMin, spliceMax))

        return res.json(dogsDb)
    } catch (error) {
        console.log(error)
    }
})


router.get('/:idRaza', async (req, res) => {
    let { idRaza } = req.params;

    try {        

        let raza = await Dog.findOne({
            where: { uuid: idRaza },
            include: Temperament,
        })
        
        if (raza) {
            raza = refactorData(raza)
            return res.json(raza)
        }

    } catch (error) {
        res.json({ error: "Not found"})
    }


})


module.exports = router;


