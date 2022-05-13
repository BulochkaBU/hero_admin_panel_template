export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDeleted = (id) => {
    return {
        type: 'HEROES_DELETED',
        payload: id
    }    
}

export const heroAdded = (newHero) => {
    return {
        type: 'HERO_ADDED',
        payload: newHero
    }    
}

export const filterActive = (newFilter) => {
    return {
        type: 'FILTER_ACTIVE',
        payload: newFilter
    }    
}

export const filterFetched = (filter) => {
    return {
        type: 'FILTERS',
        payload: filter
    }    
}