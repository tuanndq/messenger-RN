import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {postDataAPI, getDataAPI, patchDataAPI} from '../utils/fetchData';
import {setAlert} from './alertSlice';
import {addStory} from './storySlice';
import {uploadFile} from './uploadSlice';

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (token, {rejectWithValue}) => {
    try {
      const response = await getDataAPI(`user`, token);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: 'Could not send this request!',
      });
    }
  },
);

export const createStory = createAsyncThunk(
  'user/createStory',
  async ({userId, content, type, token, dispatch}, {rejectWithValue}) => {
    try {
      const url = await uploadFile(content, type, token);

      const response = await postDataAPI(
        `user/story`,
        {content: url, type: type},
        token,
      );
      console.log({
        newStory: response.data.story,
        userId,
      });

      dispatch(addStory({userId, story: response.data.story}));

      alert('Upload story successfylly!');
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: 'Could not send this request!',
      });
    }
  },
);

export const deleteStory = createAsyncThunk(
  'user/deleteStory',
  async ({userId, storyId, token}, {rejectWithValue}) => {
    try {
      const response = await deleteStory(`user/story/${storyId}`, token);
      return {deleteStoryMsg: response.data, userId, storyId};
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: 'Could not send this request!',
      });
    }
  },
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({userId, profile, token}, {rejectWithValue, dispatch}) => {
    try {
      const response = await patchDataAPI(`user`, profile, token);

      // dispatch(
      //   setAlert({
      //     type: 'updateProfile',
      //     value: 'Update information successfully!',
      //   }),
      // );
      return {
        newProfile: response.data.newUser,
        userId,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: 'Could not send this request!',
      });
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      const mapStories = action.payload.map(e => ({
        ...e,
        stories: e.stories.map(el => ({
          ...el,
          finish: 0,
        })),
      }));

      state.users = mapStories;
    },
    [createStory.fulfilled]: (state, action) => {
      state.stories.map(e => {
        if (e._id === action.payload.userId) {
          e.stories = [...e.stories, action.payload.newStory];
          return e;
        } else {
          return e;
        }
      });
    },
    [deleteStory.fulfilled]: (state, action) => {
      state.stories.map(e => {
        if (e._id === action.payload.userId) {
          e.stories.filter(story => story._id !== action.payload.storyId);
        }
      });
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.users = state.users.map(e => {
        if (e._id === action.payload.userId) {
          return action.payload.newProfile;
        } else {
          return e;
        }
      });
    },
  },
});

// export const getProfile = createAsyncThunk(
//   "user/profile",
//   async ({ userId, token }, { rejectWithValue }) => {
//     try {
//       const response = await getDataAPI(`user/${userId}`, token);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue({
//         error: "Could not send this request!",
//       });
//     }
//   }
// );

// export const upload = (uri, type, token) => async (dispatch) => {
//   try {
//     const formData = new FormData();

//     formData.append("image", {
//       uri: uri,
//       type: "image/jpg",
//       name: "new_file",
//     });
//     const response = await fetch(`${SERVER_URL}upload/${type.toLowerCase()}`, {
//       method: "post",
//       body: formData,
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Accept: "application/json",
//         Authorization: token,
//       },
//     });

//     let resJson = await response.json();
//     console.log("Url: ", resJson.url);
//     return resJson.url;
//   } catch (err) {
//     console.log(err);
//   }
// };

const {actions, reducer} = userSlice;
export const {addUser} = actions;

export default reducer;
