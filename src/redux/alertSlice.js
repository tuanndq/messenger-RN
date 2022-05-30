import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {postDataAPI} from '../utils/fetchData';

const alertSlice = createSlice({
  name: 'alert',

  initialState: {
    forgotPassword: '',
    otp: '',
    updateProfile: '',
  },

  reducers: {
    setAlert: (state, action) => {
      const {type, value} = action.payload;

      if (type) {
        state[type] = value;
      }
    },
  },

  extraReducers: {},
});

const {actions, reducer} = alertSlice;
export const {setAlert} = actions;
export default reducer;
