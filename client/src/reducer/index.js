
let initialState = {
    dogs:[],
    temperaments: [],
}

function reducer(state = initialState, action) {
    switch (action.type){
        case "GET_DOGS": {
            return state = {...state, dogs: [...action.payload]}
        }
        default: {return state}
    }
}

export default reducer;