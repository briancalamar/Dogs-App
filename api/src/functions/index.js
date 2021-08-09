require('dotenv').config();
const { API_KEY } = process.env;
const { Temperament, Dog } = require('../db');
const axios = require('axios').default

// Carga BD
const refactorAPI = function (data) {
    return data.map(e => {

        if (e.temperament) {
            e.temperament = e.temperament.split(",")
                .map(temperaments => { return temperaments.trim() })

        }
        if (e.weight?.metric) {
            e.weight = e.weight.metric.split("-")
                .map(weights => { return parseInt(weights.trim()) })

            if (e.weight[0] && e.weight[1]) e.weight = (e.weight[0] + e.weight[1]) / 2;
            else if (e.weight[0] && !e.weight[1]) e.weight = e.weight[0];
            else if (!e.weight[0] && e.weight[1]) e.weight = e.weight[1];
            else e.weight = 0;
        }
        if (e.height?.metric) {
            e.height = e.height.metric.split("-")
                .map(heights => { return parseInt(heights.trim()) })

            if (e.height[0] && e.height[1]) e.height = (e.height[0] + e.height[1]) / 2;
            else if (e.height[0] && !e.height[1]) e.height = e.height[0];
            else if (!e.height[0] && e.height[1]) e.height = e.height[1];
            else e.height = 0;
        }
        return {
            name: e.name,
            image: e.image.url,
            temperaments: e.temperament ? e.temperament : [],
            weight: e.weight,
            height: e.height,
            life_span: e.life_span.replace("years", "años"),
        }
    })
};

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

        data = await refactorAPI(data)
        return {
            dogs: data,
            temps: Array.from(new Set(temps)),
        }
    } catch (error) {
        console.log(error)
    }

}

const cargaT = async function (temps) {
    try {
        await temps.forEach(async (e) => {
            await Temperament.findOrCreate({
                where: { name: e },
            })
        })
    } catch (error) {

    }
}

const cargaD = async function (dogs, temps) {
    try {
        await dogs.forEach(async (d) => {

            let [newDog, created] = await Dog.findOrCreate({
                where: { name: d.name },
                defaults: {
                    name: d.name,
                    image: d.image,
                    weight: d.weight,
                    height: d.height,
                    life_span: d.life_span,
                }
            })
            let ids = [];
            if (created) {
                await d.temperaments.forEach(async (t) => {
                    ids.push((temps.indexOf(t) + 1))
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
        await cargaD(dogs, temps)

    } catch (error) {
        console.log(error)
    }


}

module.exports = {
    cargaBb,
}
