import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';
import { createSelector } from '@reduxjs/toolkit';
const heroesAdapter = createEntityAdapter()

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
})


export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes")
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesDeleted: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            heroesAdapter.removeOne(state, action.payload);
        },
        heroAdded: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            heroesAdapter.addOne(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload)
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
})



const {actions, reducer} = heroesSlice;
export default reducer;

export const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
        if (filter === 'all'){
            // console.log('render') // при таком методе селектор мемоизирует данные
            return heroes
        } else {
            return heroes.filter(item => item.element === filter)
        }
    }
)

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDeleted,
    heroAdded
} = actions;
