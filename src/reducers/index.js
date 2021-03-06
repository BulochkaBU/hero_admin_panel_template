const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETED':
            return {
                ...state,
                heroes: state.heroes.filter(item => action.payload !== item.id),
                heroesLoadingStatus: 'idle'
            }
        case 'HERO_ADDED':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                heroesLoadingStatus: 'idle'                
            }
        case "FILTERS":
            return {
                ...state,
                filters: action.payload
            }

            case 'FILTER_ACTIVE':
                return {
                    ...state,
                    activeFilter: action.payload,           
            }

            
        default: return state
    }
}

export default reducer;