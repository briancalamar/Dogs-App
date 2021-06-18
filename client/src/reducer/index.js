let initialState = {
    dogs: null,
    temperaments: null,
    detailDog: null,
    infoPage: {
        page: undefined,
        name: undefined,
        order: undefined,
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
            return state = {...state, temperaments: action.payload}
        }
        case "SEARCH": {
            return state = {
                ...state,
                infoPage: { ...state.infoPage, name: action.payload }
            }
        }
        case "SHOW_BAR": {
            return state = {
                ...state,
                infoPage: {
                    ...state.infoPage,
                    showBar: !state.infoPage.showBar
                }
            }
        }
        case "RESET_INFO": {
            return state = {
                dogs: null,
                temperaments: [],
                detailDog: null,
                infoPage: {
                    page: undefined,
                    name: undefined,
                    order: undefined,
                    filterSource: undefined,
                    filterTemperaments: undefined,
                    nav: false,
                }
            }
        }
        case "CREATE_DOG": {
            return state = {
                ...state,
                detailDog: action.payload
            }
        }
        default: { return state }
    }
}
