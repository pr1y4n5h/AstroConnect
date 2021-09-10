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

export const fetchAllUsers = createAsyncThunk("user/allUsers", async (userID) => {
  const {data} = await axios.get(
    `https://AstroConnect-Backend.pr1y4n5h.repl.co/user/${userID}/allusers`);

  return data;
});


// userInfo: {
//   // initialise this as null
//     _id: "61304e820abddf3713ad0013",
//     username: "preeti",
//     email: "preeti@email.com",
//     followers: ["613050260abddf3713ad001b", "61304dc50abddf3713ad000c"],
//     followings: ["61304dc50abddf3713ad000c", "613050260abddf3713ad001b"],
//     isAdmin: false
// }



export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    allUsers: [],
    token: null,
    status: {
      userLoggedIn: false,
    },
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
    
    logOutUser: (state) => {
      localStorage?.removeItem("user");
      localStorage?.removeItem("token");
      state.userInfo = null;
      state.token = null;
      state.allUsers = null
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
      state.status.userLoggedIn = true;
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(state.token));
      localStorage.setItem("user", JSON.stringify(state.userInfo));
    },

    [loginUser.rejected]: (state) => {
      state.pending = null;
      state.error = true;
    },


    [fetchAllUsers.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },

    [fetchAllUsers.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = null;
      state.allUsers = action.payload;
    }
  },
});

export const { setToken, setUser,logOutUser, resetError, followUser, unfollowUser } =
  userSlice.actions;
export default userSlice.reducer;
