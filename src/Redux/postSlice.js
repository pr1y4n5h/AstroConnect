import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTimeline = createAsyncThunk("user/feed", async (authUser) => {

  const {data} = await axios.get(`https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/timeline/${authUser._id}`);

  return data;
});


export const newPost = createAsyncThunk("user/newPost", async ({userId, desc}) => {

  const {data} = await axios.post("https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/", {
    userId, desc
  }
  );

  return data;
});



export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    pending: null,
    error: null,
  },

  reducers: {

    flushPosts: (state ) => {
      state.posts = "";
    },

    },

  extraReducers: {
    [fetchTimeline.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchTimeline.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = false;
      state.posts = action.payload.sort((a,b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      });
    },
    [fetchTimeline.rejected]: (state) => {
      state.pending = null;
      state.error = true;
    },

    [newPost.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [newPost.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = false;
      state.posts.unshift(action.payload);
    },
    [newPost.rejected]: (state) => {
      state.pending = null;
      state.error = true;
    },
  },
});

export const { flushPosts, sharePost } = postSlice.actions;
export default postSlice.reducer;
