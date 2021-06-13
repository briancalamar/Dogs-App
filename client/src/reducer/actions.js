import axios from 'axios'

export function getAllDogs() {
    return (dispatch) => {
        axios.get(`http://localhost:3001/dogs`).then( response => {
            dispatch({ type: "GET_DOGS", payload: response.data})
        })
    }
}

// export function searchDogs(name) {
//     return (dispatch) => {
//         axios.get(`http://localhost:3001/dogs`).then( response => {
//             dispatch({ type: "GET_DOGS", payload: response.data})
//         })
//     }
// }

// export function getDogs() {
//     return (dispatch) => {
//         axios.get(`http://localhost:3001/dogs`).then( response => {
//             dispatch({ type: "GET_DOGS", payload: response.data})
//         })
//     }
// }

export default  {
    getAllDogs
}