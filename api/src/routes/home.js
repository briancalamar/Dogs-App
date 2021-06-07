require('dotenv').config();
const { Router } = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use(bodyParser.json())
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res) => {
    console.log("ESTO ES LA API KEY --->", API_KEY)
})

module.exports = router;
