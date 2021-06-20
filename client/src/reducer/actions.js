import axios from 'axios'

export function getDogs({name, page, order, filterSource, ft}) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/dogs?name=${name}&page=${page}&o=${order}&fs=${filterSource}`).then(response => {
            dispatch({ type: "GET_DOGS", payload: response.data })
        })
    }
}

export function getDogsFilter({filterTemperaments}) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/dogs?ft=${filterTemperaments}`).then(response => {
            dispatch({ type: "GET_DOGS_FILTER", payload: response.data })
        })
    }
}


export function getTemperaments() {
    return (dispatch) => {
        axios.get(`http://localhost:3001/temperament`).then(response => {
            dispatch({ type: "GET_TEMP", payload: response.data })
        })
    }
}

export function search(payload) {
    return { type: "SEARCH", payload}
}

export function resetInfo() {
    return { type: "RESET_INFO" }
}

export function detailDog(id) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/dogs/${id}`).then(response => {
            dispatch({ type: "DETAIL_DOG", payload: response.data })
        })
    }
}

export function showBar() {
    return { type: "SHOW_BAR" }
}

export function createDog(data) {
    return (dispatch) => {
        axios.post(`http://localhost:3001/dog`, data).then(response => {
            dispatch({ type: "CREATE_DOG", payload: response.data })
        })
    }
}

export function filterByTemp(payload) {
    return { type: "FILTER_BY_TEMP", payload}
}

export function infoPage(payload) {
    return { type: "INFO_PAGE", payload }
}
