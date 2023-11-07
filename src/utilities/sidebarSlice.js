import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        navState: "true",
        backdropState: "false",
    },
    reducers: {
        toggleNavState: (state, action) => {
            state.navState = !state.navState;
        },
        closeNav: (state) => {
            state.navState = false;
        },
        openNav: (state) => {
            state.navState = true;
        },
        addBackdrop: (state) => {
            state.backdropState = true;
        },
        removeBackdrop: (state) => {
            state.backdropState = false;
        },
    },
});

export const {
    toggleNavState,
    closeNav,
    openNav,
    addBackdrop,
    removeBackdrop,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
