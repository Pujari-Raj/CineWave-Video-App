import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";
import librarySlice from "./librarySlice";
import searchSlice from "./searchSlice";


const store = configureStore({
    reducer:{
        sidebar: sidebarSlice, //
        library: librarySlice,
        suggestionsCache: searchSlice,
    },
})

export default store;