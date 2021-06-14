import axios from 'axios'

export function getDogs(name, page, order, filterSource, filterTemperaments) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/dogs?name=${name}&page=${page}&o=${order}&fs=${filterSource}&ft=${filterTemperaments}`).then(response => {
            dispatch({ type: "GET_DOGS", payload: response.data })
        })
    }
}

function detailDog(id) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/dogs/${id}`).then(response => {
            dispatch({ type: "GET_DOG", payload: response.data })
        })
    }
}

function createDog(payload) {
    return { type: "CREATE_DOG", payload }
}

const actions = {
    getDogs,
    detailDog,
    createDog,
}


export default  actions;