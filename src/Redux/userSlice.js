import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("user/login", async (user) => {
  const res = await axios.post(
    `
    https://astroconnect-backend.pr1y4n5h.repl.co/auth/login
    `,
    user
  );
  return res.data;
});

export const fetchCurrentUserPosts = createAsyncThunk("user/userposts", async (userID) => {

  const {data} = await axios.get(`https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/profile/${userID}`);

  return data;
});


export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      // initialise this as null
        _id: "61304e820abddf3713ad0013",
        username: "preeti",
        email: "preeti@email.com",
        followers: ["613050260abddf3713ad001b", "61304dc50abddf3713ad000c"],
        followings: ["61304dc50abddf3713ad000c", "613050260abddf3713ad001b"],
        isAdmin: false
    },

    // userInfo: {},
    userPosts: [],
    individualUser: {},
    token: null,
    pending: null,
    error: null,
  },

  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },

    setUser: (state, action) => {
      state.userInfo = action.payload;
    },

    resetToken: (state) => {
      localStorage?.removeItem("token");
      state.token = null;
    },

    resetUser: (state) => {
      localStorage?.removeItem("user");
      state.userInfo = null;
    },

    followUser: (state, action) => {
      state.userInfo = {...state.userInfo, followings: [...state.userInfo.followings, action.payload]}
    },

    unfollowUser: (state, action) => {
      state.userInfo = {...state.userInfo, followings: state.userInfo.followings.filter(item => item !== action.payload)}
    },

    resetError: (state) => {
      state.error = "";
    },
  },
  
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = false;
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
      localStorage?.setItem("token", JSON.stringify(state.token));
      localStorage?.setItem("user", JSON.stringify(state.userInfo));
    },

    [loginUser.rejected]: (state) => {
      state.pending = null;
      state.error = true;
    },

    [fetchCurrentUserPosts.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchCurrentUserPosts.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = false;
      state.userPosts = action.payload.sort((a,b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      });
    },
  },
});

export const { setToken, setUser, resetUser, resetToken, resetError, followUser, unfollowUser } =
  userSlice.actions;
export default userSlice.reducer;
