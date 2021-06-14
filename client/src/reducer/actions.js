import axios from 'axios'

export function getDogs(name, page, order, filterSource, filterTemperaments) {
    console.log("este es el nombre", name)
    return (dispatch) => {
        axios.get(`http://localhost:3001/dogs?name=${name}&page=${page}&o=${order}&fs=${filterSource}&ft=${filterTemperaments}`).then(response => {
            console.log(response.status)
            dispatch({ type: "GET_DOGS", payload: response.data })
        })
    }
}

export function search(payload) {
    return { type: "SEARCH", payload}
}

export function resetInfo() {
    return { type: "RESET_INFO"}
}

export function detailDog(id) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/dogs/${id}`).then(response => {
            dispatch({ type: "GET_DOG", payload: response.data })
        })
    }
}

export function showBar() {
    return { type: "SHOW_BAR" }
}

export function createDog(payload) {
    return { type: "CREATE_DOG", payload }
}

const actions = {
    getDogs,
    detailDog,
    createDog,
    search,
    showBar
}


export default  actions;