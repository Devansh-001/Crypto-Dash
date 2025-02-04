import { createSlice } from "@reduxjs/toolkit";



const coinSlice = createSlice({
    name: "coinSlice",
    initialState: {
        allCoins: [],
        currency: {
            name: "usd",
            symbol: "$"
        },
        searchInput: "",
        page: 1,
        user: null,
        alert: {
            msg: "",
            type: "success",
            openSnackBar: false,
        },
        watchlist: []

    },
    reducers: {
        setAllCoins: (state, action) => {
            state.allCoins = action.payload;
        },
        setCurrency: (state, action) => {
            state.currency = action.payload;
        },
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAlert: (state, action) => {
            state.alert = action.payload;
        },
        setWatchlist: (state, action) => {
            state.watchlist = action.payload;
        }
    }

})

export const { setAllCoins, setCurrency, setSearchInput, setPage, setUser, setAlert, setWatchlist } = coinSlice.actions;

export default coinSlice.reducer;