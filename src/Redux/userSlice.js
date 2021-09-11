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


export const fetchAllUsers = createAsyncThunk("user/allUsers", async ({userID, token}) => {
  const {data} = await axios.get(
    `https://AstroConnect-Backend.pr1y4n5h.repl.co/user/${userID}/allusers`, { headers: { authorization: token } })

  return data;
});




export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage?.getItem("user")) || {},
    allUsers: [],
    token: null || JSON.parse(localStorage?.getItem("token")),
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

    follow: (state, action) => {
      const allUsers = state.allUsers.map(item => item._id === action.payload.user ? {...item, followers: [...item.followers, action.payload.loggedUser]} : item);

      return {...state, allUsers}
    },

    unfollow: (state, action) => {
      const allUsers = state.allUsers.map(item => item._id === action.payload.user ? {...item, followers: item.followers.filter(user => user !== action.payload.loggedUser)} : item )

      return {...state, allUsers}
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

export const { follow, unfollow, setToken, setUser, logOutUser, resetError } =
  userSlice.actions;
export default userSlice.reducer;
