import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getPostStarts: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getPostSuccess: (state, action) => {
      state.isFetching = false;
      state.posts = action.payload;
    },
    getPostFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deletePostStarts: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deletePostSuccess: (state, action) => {
      state.isFetching = false;
      state.posts.splice(
        state.posts.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deletePostFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    editPostStarts: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    editPostSuccess: (state, action) => {
      state.isFetching = false;
      state.posts[state.posts.findIndex((item) => item._id === action.payload.id)] = action.payload.post;
    },
    editPostFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    createPostStarts: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createPostSuccess: (state, action) => {
      state.isFetching = true;
      state.posts.push(action.payload)
    },
    createPostFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    
  },
});

export const {
  getPostStarts,
  getPostSuccess,
  getPostFailed,
  deletePostStarts,
  deletePostSuccess,
  deletePostFailed,
  editPostStarts,
  editPostSuccess,
  editPostFailed,
  createPostStarts,
  createPostSuccess,
  createPostFailed,
} = postSlice.actions;
export default postSlice.reducer;
