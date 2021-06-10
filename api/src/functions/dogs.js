const refactorData = function (data, el) {
    if (el === "limited") {
        return data.map(e => {

            if (e.id < 265) {
                if (e.temperament) {
                    e.temperament = e.temperament.split(",")
                        .map(temperaments => { return temperaments.trim() })

                }
                return {
                    id: e.id,
                    name: e.name,
                    temperaments: e.temperament,
                    image: e.image.url
                }
            }
            else {
                if (e.temperaments) {
                    e.temperaments = e.temperaments.map(e => e.name)
                }
                return {
                    id: e.id,
                    name: e.name,
                    image: e.image,
                    temperaments: e.temperaments,
                }
            }
        });
    }
    else if (el === "extended") {
        if (data.id < 265) {
            if (data.temperament) {
                data.temperament = data.temperament.split(",")
                    .map(temperaments => { return temperaments.trim() })
            }
            return {
                id: data.id,
                name: data.name,
                temperaments: data.temperament,
                image: data.image.url,
                weight: data.weight,
                height: data.height,
                life_span: data.life_span
            }
        }
        else {
            if (data.temperaments) {
                data.temperaments = data.temperaments.map(e => e.name)
            }
            return {
                id: data.id,
                name: data.name,
                image: data.image,
                temperaments: data.temperaments,
                weight: data.weight,
                height: data.height,
                life_span: data.life_span
            }
        }
    }
    else throw new TypeError("The second argument must be limited / extended")
};

module.exports = {
    refactorData,
}