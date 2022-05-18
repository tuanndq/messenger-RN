import { createSlice } from "@reduxjs/toolkit";
import { postDataAPI, getDataAPI } from "../utils/fetchData";
import { fetchCurrentMessages } from "./messageSlice";

const conversationSlice = createSlice({
  name: 'conversation',

  initialState: {
    conversations: [],
    current_conversation: {},
    members: [],
  },

  reducers: {
    getConversations(state) {
      return state.conversations;
    },
    setConversations(state, action) {
      state.conversations = action.payload;
    },

    getCurrentConversation(state) {
      return state.current_conversation;
    },
    setCurrentConversation(state, action) {
      state.current_conversation = action.payload;
    },

    getMembers(state) {
      return state.members;
    },
    setMembers(state, action) {
      state.members = action.payload;
    },
  },
});

export const fetchConversations = (userId, token) => async (dispatch) => {
  try {
    const res = await getDataAPI(
      `conversation/user/${userId}`,
      token
    );

    if (res.status === 200) {
      // Change title of Conversations whose title = '1vs1' into peerName
      for (const conversation of res.data.conversations) {
        if (conversation.title === '1vs1') {
          let peerId = userId === conversation.members[0] ? conversation.members[1] : conversation.members[0];
          const peerRes = await getDataAPI(
            `user/${peerId}`,
            token
          );

          if (peerRes.status === 200) {
            conversation.title = peerRes.data.fullName;
            conversation.avatar = peerRes.data.avatar;
          } else {
            console.log(peerRes);
          }
        }
      }

      dispatch(setConversations(res.data.conversations));
    } else {
      console.log(res);
    }

  } catch (err) {
    console.log(err);
  }
};

export const fetchConversationById = (conversationId, token) => async (dispatch) => {
  try {
    const res = await getDataAPI(
      `conversation/id/${conversationId}`,
      token
    );

    if (res.status === 200) {
      dispatch(setCurrentConversation(res.data));
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
}

export const fetchMembers = (conversationId, token) => async (dispatch) => {
  try {
    const res = await getDataAPI(
      `conversation/members/${conversationId}`,
      token
    );

    if (res.status === 200) {
      dispatch(setMembers(res.data));
    } else {
      console.log(res);
    }

  } catch (err) {
    console.log(err);
  }
};

export const fetchConversation1vs1 = (peerA, peerB, token) => async (dispatch) => {
  try {
    const res = await getDataAPI(
      `conversation/peers?peerA=${peerA}&peerB=${peerB}`,
      token
    );

    if (res.status === 200) {

      const peerRes = await getDataAPI(
        `user/${peerB}`,
        token
      );

      if (peerRes.status === 200) {
        res.data.title = peerRes.data.fullName;
        res.data.avatar = peerRes.data.avatar;
      } else {
        console.log(peerRes);
      }

      dispatch(setCurrentConversation(res.data));
      dispatch(fetchCurrentMessages(res.data._id, token));
      
    } else {
      console.log(res);
    }

  } catch (err) {
    console.log(err);
  }
};

export const fetchCreateConversation = (title, members, token) => async (dispatch) => {
  try {
    const res = await postDataAPI('/', { title, members, }, token);

    if (res.status === 201) {
      console.log(res.data);
      return res.data;
    } else {
      console.log(res);
    }

  } catch (err) {
    console.log(err);
  }
}

const { actions, reducer } = conversationSlice;

export const {
  getConversations,
  setConversations,
  getCurrentConversation,
  setCurrentConversation,
  getMembers,
  setMembers,
} = actions;

export default reducer;
