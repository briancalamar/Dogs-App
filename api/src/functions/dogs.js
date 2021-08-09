// const refactorData = function (data, el) {

//     if (el === "limited") {
//         return data.map(e => {

//                 if (e.temperaments) {
//                     e.temperaments = e.temperaments.map(e => e.name)
//                 }
//                 if (e.weight) {
//                     e.weight = e.weight.split("-")
//                         .map(weights => { return parseInt(weights.trim()) })

//                     if (e.weight[0] && e.weight[1]) e.weight = (e.weight[0] + e.weight[1]) / 2;
//                     else if (e.weight[0] && !e.weight[1]) e.weight = e.weight[0];
//                     else if (!e.weight[0] && e.weight[1]) e.weight = e.weight[1];
//                     else e.weight = null;
//                 }
//                 return {
//                     name: e.name,
//                     image: e.image,
//                     temperaments: e.temperaments,
//                     weight: e.weight,
//                 }
//         });
//     }
//     else if (el === "extended") {
//             if (data.temperaments) {
//                 data.temperaments = data.temperaments.map(e => e.name)
//             }
//             if (data.weight) {
//                 data.weight = data.weight.split("-")
//                     .map(weights => { return parseInt(weights.trim()) })
//             }
//             if (data.height) {
//                 data.height = data.height.split("-")
//                     .map(height => { return parseInt(height.trim()) })
//             }
//             return {
//                 id: data.id,
//                 name: data.name,
//                 image: data.image,
//                 temperaments: data.temperaments,
//                 minWeight: data.weight[0],
//                 maxWeight: data.weight[1],
//                 minHeight: data.height[0],
//                 maxHeight: data.height[1],
//                 life_span: data.life_span
//             }
//     }
//     else throw new TypeError("The second argument must be limited / extended")
// };

const refactorData = function (data) {

    try {
        if(Array.isArray(data)){
            return data.map(dog => {
        
                
                return {
                    id: dog.uuid,
                    name: dog.name,
                    image: dog.image,
                    weight: dog.weight,
                    height: dog.height,
                    temperaments
                }
            })
        }
        else {

            let temperaments = data.temperaments.map(temp => {
                return {
                    id: temp.id,
                    name: temp.name
                }
            })
            return {
                id: data.uuid,
                name: data.name,
                image: data.image,
                weight: data.weight,
                height: data.height,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                temperaments
            }
        }
    } catch (error) {
        console.log(error)
    }

}

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