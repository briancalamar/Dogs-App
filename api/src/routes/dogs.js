require('dotenv').config();
const { Router } = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const { Dog, Temperament, dog_temperamet } = require('../db');
const { refactorData } = require('../functions/dogs')
const { Op } = require('sequelize');
const { API_KEY } = process.env;


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use(bodyParser.json())
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res) => {
    let { name: n, page } = req.query;
    if (!page) page = 1;
    let spliceMin = 8 * (page - 1);
    let spliceMax = (page * 8)

    let { data } = await axios.get(`https://api.thedogapi.com/v1/breeds${API_KEY}`);

    let dataApi = refactorData(data, "limited")

    let dataBd = await Dog.findAll({
        attributes: ['id', 'name', 'image'],
        include: Temperament,
    })

    dataBd = refactorData(dataBd, "limited")

    if (dataBd) newdata = [...dataApi, ...dataBd];

    if (n) {
        newdata = newdata.filter(e => e.name.toLowerCase().includes(n.toLocaleLowerCase()))

    }

    res.json(newdata.slice(spliceMin, spliceMax))
})

router.get('/:idRaza', async (req, res) => {
    const { idRaza } = req.params;

    if (idRaza < 265) {
        let { data } = await axios.get(`https://api.thedogapi.com/v1/breeds${API_KEY}`);
        let raza = data.find(e => e.id === parseInt(idRaza))

        if (raza) res.json(refactorData(raza, "extended"))
    } else {
        let raza = await Dog.findOne({
            where: { id: idRaza },
            include: Temperament,
        })
        if (raza) return res.json(refactorData(raza, "extended"))
    }
    res.json({ raza: false })
})

module.exports = router;
// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados