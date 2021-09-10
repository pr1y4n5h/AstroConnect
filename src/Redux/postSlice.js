import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTimeline = createAsyncThunk(
  "post/timeline",
  async (userID) => {
    const { data } = await axios.get(
      `https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/timeline/${userID}`
    );

    return data;
  }
);

export const fetchCurrentUserPosts = createAsyncThunk(
  "post/currentUserposts",
  async (userID) => {
    const { data } = await axios.get(
      `https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/profile/${userID}`
    );

    return data;
  }
);


export const getCurrentPost = createAsyncThunk(
  "post/currentpost",
  async (postID) => {
    const { data } = await axios.get(
      `https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${postID}`
    );

    return data;
  }
);

export const createNewPost = createAsyncThunk(
  "post/createNewPost",
  async (newPost) => {
    const { data } = await axios.post(
      "https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/",
        newPost
    );
    return data;
  }
);

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
    flushPosts: (state) => {
      state.posts = "";
    },

    addToLikes: (state, action) => {
      const posts = state.posts.map((item) =>
        item._id === action.payload.postId
          ? { ...item, likes: [...item.likes, action.payload.userId] }
          : item
      );
      return { ...state, posts };
    },

    removeFromLikes: (state, action) => {
      const posts = state.posts.map((post) =>
        post._id === action.payload.postId
          ? {
              ...post,
              likes: post.likes.filter(
                (userId) => userId !== action.payload.userId
              ),
            }
          : post
      );

    
      return { ...state, posts };
    },

    updateCurrentPost: (state, action) => {
      state.currentPost = { ...state, desc: action.payload };
    },

    setLoader: (state) => {
      state.loader = !state.loader;
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
      state.posts = action.payload.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    },
    [fetchTimeline.rejected]: (state) => {
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
      state.posts = action.payload.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
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


    [createNewPost.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [createNewPost.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = false;
      state.posts.unshift(action.payload);
    },
  },
});

export const {
  flushPosts,
  sharePost,
  addToLikes,
  removeFromLikes,
  updatePosts,
  updateCurrentPost,
  setLoader,
} = postSlice.actions;
export default postSlice.reducer;
