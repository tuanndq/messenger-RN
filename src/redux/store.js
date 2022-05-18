import {
  configureStore,
  applyMiddleware,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
import authSlice from "./authSlice";
import storySlice from "./storySlice";
import uploadSlice from "./uploadSlice";
import messageSlice from "./messageSlice";
import conversationSlice from "./conversationSlice";
import socketSlice from "./socketSlice";

const composedEnhancers = composeWithDevTools();

const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
  auth: authSlice,
  story: storySlice,
  upload: uploadSlice,
  message: messageSlice,
  conversation: conversationSlice,
  socket: socketSlice,
});

const store = configureStore({
  reducer: rootReducer,
  composedEnhancers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
