import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postDataAPI, getDataAPI } from "../utils/fetchData";

const storySlice = createSlice({
  name: "story",
  initialState: {
    storiesExist: [],
  },
  reducers: {
    getStoriesExist(state, action) {
      state.storiesExist = action.payload;
    },
    removeStoriesExist(state, action) {
      state.storiesExist = state.storiesExist.filter(
        (e) => e._id !== action.payload._id
      );
    },
  },
  extraReducers: {},
});

const { actions, reducer } = storySlice;
export const { getStoriesExist, removeStoriesExist } = actions;

export default reducer;
