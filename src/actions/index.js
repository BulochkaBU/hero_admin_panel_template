import { heroesFetched, heroesFetching,  heroesFetchingError} from "../components/heroesList/heroesSlice"
import { filterFetched } from "../components/heroesFilters/filtersSlice"


export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching())
        request("http://localhost:3001/heroes", 'GET')
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    request("http://localhost:3001/filters", 'GET')
        .then(data => dispatch(filterFetched(data)))
}



