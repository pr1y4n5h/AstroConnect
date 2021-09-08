import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTimeline = createAsyncThunk("post/timeline", async (authUser) => {

  const {data} = await axios.get(`https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/timeline/${authUser._id}`);

  return data;
});

export const getCurrentPost = createAsyncThunk("post/currentpost", async (postID) => {

  const {data} = await axios.get(`https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${postID}`);

  return data;
});
 
export const newPost = createAsyncThunk("post/newPost", async ({userId, desc}) => {

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
    currentPost: {},
    loader: false,
    pending: null,
    error: null,
  },

  reducers: {

    flushPosts: (state ) => {
      state.posts = "";
    },

    addToLikes: (state, {postID, userID}) => {
      const postIndex = state.posts.findIndex(item => item._id === postID);
      return state.posts[postIndex].likes.concat(userID);
    },

    removeFromLikes: (state, {postID, userID}) => {
      const postIndex = state.posts.findIndex(item => item._id === postID);
      return state.posts[postIndex].likes.pop();
    },

    updateCurrentPost: (state, action) => {
      state.currentPost = {...state, desc: action.payload}
    },

    setLoader: (state) => {
      state.loader = !state.loader
    }
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

    [getCurrentPost.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getCurrentPost.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = false;
      state.currentPost = action.payload;
    },

    [getCurrentPost.rejected]: (state) => {
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
  },
});

export const { flushPosts, sharePost, addToLikes, removeFromLikes, updatePosts, updateCurrentPost, setLoader} = postSlice.actions;
export default postSlice.reducer;
