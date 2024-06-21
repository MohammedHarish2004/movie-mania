import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
};

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        setWatchlist: (state, action) => {
            state.items = action.payload;
        },

        removeWatchlist: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload)
        },
    }
});

export const { setWatchlist, removeWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;