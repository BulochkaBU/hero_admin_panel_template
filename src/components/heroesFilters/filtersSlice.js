import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    activeFilter: 'all'
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterFetched: (state, action) => {state.filters = action.payload},
        filterActive: (state, action) => {state.activeFilter = action.payload},
    }
})

const {actions, reducer} = filtersSlice;
export default reducer;
export const {
    filterFetched,
    filterActive,
} = actions;