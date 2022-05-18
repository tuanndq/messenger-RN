import { createSlice } from "@reduxjs/toolkit";
import { postDataAPI, getDataAPI } from "../utils/fetchData";
import { SERVER_URL } from "../utils/ip";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
  },
  reducers: {
    getSocket(state, action) {
      state.socket = action.payload;
    },
  },
});

const { actions, reducer } = socketSlice;

export const { getSocket } = actions;

export default reducer;
