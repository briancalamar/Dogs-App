const refactorData = function (data, el) {

    if (el === "limited") {
        return data.map(e => {

            if (e.id <= 999) {
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
                    else e.weight = null;
                }
                if (e.height?.metric) {
                    e.height = e.height.metric.split("-")
                        .map(heights => { return parseInt(heights.trim()) })

                    if (e.height[0] && e.height[1]) e.height = (e.height[0] + e.height[1]) / 2;
                    else if (e.height[0] && !e.height[1]) e.height = e.height[0];
                    else if (!e.height[0] && e.height[1]) e.height = e.height[1];
                    else e.height = null;
                }
                return {
                    // id: e.id,
                    name: e.name,
                    image: e.image.url,
                    temperaments: e.temperament,
                    weight: e.weight ? e.weight : "no data",
                    height: e.height ? e.height : "no data",
                    life_span: e.life_span ? e.life_span : "no data",
                }
            }
            else {
                if (e.temperaments) {
                    e.temperaments = e.temperaments.map(e => e.name)
                }
                if (e.weight) {
                    e.weight = e.weight.split("-")
                        .map(weights => { return parseInt(weights.trim()) })

                    if (e.weight[0] && e.weight[1]) e.weight = (e.weight[0] + e.weight[1]) / 2;
                    else if (e.weight[0] && !e.weight[1]) e.weight = e.weight[0];
                    else if (!e.weight[0] && e.weight[1]) e.weight = e.weight[1];
                    else e.weight = null;
                }
                return {
                    // id: e.id,
                    name: e.name,
                    image: e.image,
                    temperaments: e.temperaments,
                    weight: e.weight,
                }
            }
        });
    }
    else if (el === "extended") {
        if (data.id <= 999) {
            if (data.temperament) {
                data.temperament = data.temperament.split(",")
                    .map(temperaments => { return temperaments.trim() })
            }

            if (data.weight?.metric) {
                data.weight = data.weight.metric.split("-")
                    .map(weights => { return parseInt(weights.trim()) })
            }
            if (data.height?.metric) {
                data.height = data.height.metric.split("-")
                    .map(height => { return parseInt(height.trim()) })
            }
            return {
                id: data.id,
                name: data.name,
                image: data.image.url,
                temperaments: data.temperament,
                minWeight: data.weight[0],
                maxWeight: data.weight[1],
                minHeight: data.height[0],
                maxHeight: data.height[1],
                life_span: data.life_span
            }
        }
        else {
            if (data.temperaments) {
                data.temperaments = data.temperaments.map(e => e.name)
            }
            if (data.weight) {
                data.weight = data.weight.split("-")
                    .map(weights => { return parseInt(weights.trim()) })
            }
            if (data.height) {
                data.height = data.height.split("-")
                    .map(height => { return parseInt(height.trim()) })
            }
            return {
                id: data.id,
                name: data.name,
                image: data.image,
                temperaments: data.temperaments,
                minWeight: data.weight[0],
                maxWeight: data.weight[1],
                minHeight: data.height[0],
                maxHeight: data.height[1],
                life_span: data.life_span
            }
        }
    }
    else throw new TypeError("The second argument must be limited / extended")
};


const orderData = function (data, ad) {
    ad = ad.toLowerCase()

    switch (ad) {
        case "wa": return data.sort(function (a, b) {
            if (a.weight > b.weight) {
                return 1;
            }
            if (a.weight < b.weight) {
                return -1;
            }
            return 0;
            });
        case "wd": return data.sort(function (a, b) {
            if (a.weight > b.weight) {
                return 1;
            }
            if (a.weight < b.weight) {
                return -1;
            }
            return 0;
            }).reverse();
        case "na": return data.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            return 0;
            });
        case "nd": return data.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            return 0;
            }).reverse();
        default: throw new TypeError("The second argument must be wa/wd/na/nd");
    }
}

module.exports = {
    refactorData,
    orderData,
}