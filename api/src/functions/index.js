require('dotenv').config();
const { API_KEY } = process.env;
const { Temperament } = require('../db');
const axios = require('axios').default


// Carga BD
const pedidoApi = async function () {
    let { data } = await axios.get(`https://api.thedogapi.com/v1/breeds${API_KEY}`)
    let newinfo = [];

    data.map(e => {
        let { temperament } = e;
        if (temperament) {
            let array = temperament.split(",")
            array.map(e => newinfo.push(e.trim()))
        }

    })
    return Array.from(new Set(newinfo))
}

const cargaBb = async function () {
    let temperaments = await pedidoApi();
    temperaments.forEach(async (e) => {
        await Temperament.findOrCreate({
            where: { name: `${e}` }
        })
    })
}

module.exports = {
    cargaBb,
}
