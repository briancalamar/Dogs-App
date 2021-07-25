let initialState = {
    dogs: null,
    dogsFilter: null,
    temperaments: null,
    detailDog: null,
    infoPage: {
        name: undefined,
        page: 1,
        order: "na",
        filterSource: undefined,
        filterTemperaments: undefined,
        showBar: false,
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "GET_DOGS": {
            return state = { ...state, dogs: [...action.payload] }
        }
        case "DETAIL_DOG": {
            return state = { ...state, detailDog: action.payload }
        }
        case "GET_TEMP": {
            return state = { ...state, temperaments: action.payload }
        }
        case "SEARCH": {
            return state = {
                ...state,
                infoPage: { ...state.infoPage, name: action.payload }
            }
        }
        case "INFO_PAGE": {
            return state = {
                ...state,
                infoPage: { ...state.infoPage, ...action.payload }
            }
        }
        case "RESET_INFO": {
            return state = {
                dogs: null,
                dogsFilter: null,
                temperaments: null,
                detailDog: null,
                infoPage: {
                    name: undefined,
                    page: 1,
                    order: "na",
                    filterSource: undefined,
                    filterTemperaments: undefined,
                    showBar: false,
                }
            }
        }
        case "CREATE_DOG": {
            return state = {
                ...state,
                detailDog: action.payload
            }
        }
        //-------------------
        case "GET_DOGS_FILTER": {
            return state = {
                ...state,
                dogsFilter: action.payload
            }
        }
        //-------------------
        default: return state
    }
}
