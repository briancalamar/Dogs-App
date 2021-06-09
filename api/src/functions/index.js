require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios').default



const cargaBD = async function () {
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

module.exports = {
    cargaBD,
}

