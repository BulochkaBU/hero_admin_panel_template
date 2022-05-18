import { createReducer } from "@reduxjs/toolkit"
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDeleted,
    heroAdded
} from '../actions'


const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

// const heroes = createReducer(initialState, {
//     [heroesFetching]: state => {
//         state.heroesLoadingStatus = 'loading'
//     }, // обязательно оборачивать в фигурные скобки, иначе считается как return, а это нарушит иммутабельность и приведет к багам
//     [heroesFetched]: (state, action) => {
//         state.heroesLoadingStatus = 'idle';
//         state.heroes = action.payload;
//     },
//     [heroesFetchingError]: state => {
//         state.heroesLoadingStatus = 'error'
//     },
//     [heroesDeleted]: (state, action) => {
//         state.heroesLoadingStatus = 'idle';
//         state.heroes = state.heroes.filter(item => action.payload !== item.id);
//     },
//     [heroAdded]: (state, action) => {
//         state.heroesLoadingStatus = 'idle';
//         state.heroes.push(action.payload);
//     },
//     },
//     [],
//     state => state 
// )


const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading' // библиотека immer js встроена, можно напрямую мутироватьб она сама контролирует
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error'
        })
        .addCase(heroesDeleted, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = state.heroes.filter(item => action.payload !== item.id);
        })
        .addCase(heroAdded, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes.push(action.payload);
        })
        .addDefaultCase(() => {})
})


// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HEROES_DELETED':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => action.payload !== item.id),
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HERO_ADDED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//                 heroesLoadingStatus: 'idle'                
//             }
            
//         default: return state
//     }
// }

export default heroes;