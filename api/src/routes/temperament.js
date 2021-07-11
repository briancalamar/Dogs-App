require('dotenv').config();
const express = require('express');
const { Router } = require('express');
const axios = require('axios').default;
const { Dog, Temperament } = require('../db');
const { Op } = require('sequelize'); 
const { API_KEY } = process.env;
const { cargadoBD } = require('../functions')


const router = Router();

router.use(express.json())

router.get('/', async (req, res) => {
    try {
        let temperaments = await Temperament.findAll()
        res.json(temperaments)
    } catch (error) {
        console.log(error.data)
    }


})


module.exports = router;