let initialState = {
    dogs: [],
    temperaments: [],
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
                dogs: [],
                temperaments: [],
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
        default: { return state }
    }
}
