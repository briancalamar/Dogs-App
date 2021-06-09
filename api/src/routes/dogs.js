require('dotenv').config();
const { Router } = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const { Dog, Temperament, dog_temperamet } = require('../db');
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
    if(!page) page = 1;
    let spliceMin = 8 * (page - 1);
    let spliceMax = (page * 8)
    
    let { data } = await axios.get(`https://api.thedogapi.com/v1/breeds${API_KEY}`);

    let dataApi = data.map( e => {
        if (e.temperament) {
            e.temperament = e.temperament.split(",")
            .map(temperaments => { return temperaments.trim()})
        }
        return {
            id: e.id,
            name: e.name,
            temperaments: e.temperament,
            image: e.image.url
        }
    });

    let dataBd = await Dog.findAll({
        attributes: ['id','name', 'image'],
        include: Temperament,
    })
    dataBd = dataBd.map( e => {
        if(e.temperaments){
            e.temperaments = e.temperaments.map( e => e.name)
        }
        return {
            id: e.id,
            name: e.name,
            image: e.image,
            temperaments: e.temperaments,
        }
    })

    if(dataBd) newdata = [...dataApi, ...dataBd];

    if (n) {
        newdata = newdata.filter(e => e.name.toLowerCase().includes(n.toLocaleLowerCase()))

    }

    res.json(newdata.slice(spliceMin, spliceMax))
})



module.exports = router;
// [ ] GET /dogs:
// Obtener un listado de las primeras 8 razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
// [ ] GET /dogs?name="...":
// Obtener un listado de las primeras 8 razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados