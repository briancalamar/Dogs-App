require('dotenv').config();
const { API_KEY } = process.env;
const { Temperament, Dog } = require('../db');
const axios = require('axios').default
const { refactorData } = require('../functions/dogs')

// Carga BD
const pedidoApi = async function () {

    try {
        let { data } = await axios.get(`https://api.thedogapi.com/v1/breeds${API_KEY}`)
        let temps = [];

        data.map(e => {
            let { temperament } = e;
            if (temperament) {
                let array = temperament.split(",")
                array.map(e => temps.push(e.trim()))
            }

        })

        data = await refactorData(data, "limited")

        return {
            dogs: data,
            temps: Array.from(new Set(temps)),
        }
    } catch (error) {
        console.log(error)
    }

}

const cargaT = async function(temps) {
    try {
        await temps.forEach(async (e) => {
            await Temperament.findOrCreate({
                where: { name: `${e}` }
            })
        })
    } catch (error) {
        
    }
}

const cargaD = async function(dogs) {
    try {
        await dogs.forEach(async (e) => {
            let [newDog, created] = await Dog.findOrCreate({
                where: { name: e.name },
                defaults: {
                    name: e.name,
                    image: e.image,
                    // temperaments: e.temperaments,
                    weight: e.weight,
                    height: e.height,
                    life_span: e.life_span
                }
            });

            if(created && e.temperaments) {

                let ids = [];

                await e.temperaments.forEach(async (e) => {
                    let temp = await Temperament.findOne({
                        where:{
                            name: e,
                        }
                    })
                    if(temp.id !== "no data") ids.push(temp.id)
                    
                })

                await newDog.addTemperament(ids);
            }
        })
    } catch (error) {
        
    }
}

const cargaBb = async function () {

    try {
        let { dogs, temps } = await pedidoApi();

        await cargaT(temps)
        await cargaD(dogs)

    } catch (error) {
        console.log(error)
    }


}

module.exports = {
    cargaBb,
}
