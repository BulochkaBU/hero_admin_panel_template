const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filteredHeroes: [],
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
                filteredHeroes: state.activeFilter === 'all' ?
                                action.payload : action.payload.filter(item => item.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETED':
            let newHeroesList = state.heroes.filter(item => action.payload !== item.id)
            return {
                ...state,
                heroes: newHeroesList,
                filteredHeroes: state.activeFilter === 'all' ?
                                newHeroesList : newHeroesList.filter(item => item.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HERO_ADDED':
            let newHero = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newHero,
                filteredHeroes: state.activeFilter === 'all' ?
                                newHero : newHero.filter(item => item.element === state.activeFilter),
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
                    filteredHeroes: action.payload === 'all' ?
                                state.heroes : state.heroes.filter(item => item.element === action.payload),                
            }

            
        default: return state
    }
}

export default reducer;