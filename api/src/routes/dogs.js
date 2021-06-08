require('dotenv').config();
const { Router } = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const { Dog, Temperament } = require('../db');
const { Op } = require('sequelize'); 
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use(bodyParser.json())
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res) => {
    let { name: n} = req.query;
    let { data } = await axios.get(`https://api.thedogapi.com/v1/breeds${API_KEY}`);
    if( n ) {
        let info = []
        let filtrado = data.filter( e => e.name.toLowerCase().includes(n.toLocaleLowerCase()))
        filtrado.map( e => {
            let { name, temperament, image } = e
            image = image.url
        
            info.push({ name, temperament, image})
        })

        let filtradoDb = await Dog.findAll({
            where: {
                name: {
                  [Op.like]: `%${n}`
                }
            }
        })
        if(filtradoDb) filtrado = [...filtrado, ...filtradoDb]
        if(filtrado.length === 0) res.status(204).send({error: "No se encontro resultado"})

        return res.json(filtrado.slice(0,8))
    }

    res.json(data.slice(0,8))
})


router.get('/p', async (req, res) => {
    await Dog.create({
        name: "african",
        height: "22",
        weight: "33",
        image: "url"
    })
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