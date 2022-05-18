import { createAction } from "@reduxjs/toolkit"

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


export const heroesFetching = createAction('HEROES_FETCHING')

export const heroesFetched = createAction('HEROES_FETCHED')

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')

export const heroesDeleted = createAction('HEROES_DELETED')

export const heroAdded = createAction('HERO_ADDED')

export const filterActive = createAction('FILTER_ACTIVE')

export const filterFetched = createAction('FILTERS')
