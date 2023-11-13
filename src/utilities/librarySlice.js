import { createSlice } from "@reduxjs/toolkit";

const librarySlice = createSlice({
  name: "library",
  initialState: {
    watchlater: localStorage.getItem("watchlaterdata")
      ? JSON.parse(localStorage.getItem("watchlaterdata"))
      : [],
  },
  reducers: {
    addVideo : (state, action) => {
        state.watchlater.push(action.payload);
        localStorage.setItem("watchlaterdata", JSON.stringify(state.watchlater));
    },
    removeVideo: (state, action) => {
        state.watchlater = state.watchlater.filter(
            (item) => item!= action.payload,
        );
        localStorage.setItem("watchlaterdata", JSON.stringify(state.watchlater));
    },
    clearVideos:(state, action) => {
        state.watchlater = [];
        localStorage.removeItem("watchlaterdata")
    }
  },
});

export const {addVideo, removeVideo, clearVideos} = librarySlice.actions;

export default librarySlice.reducer;
