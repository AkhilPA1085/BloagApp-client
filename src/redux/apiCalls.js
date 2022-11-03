import { publicRequest, userRequest } from "../requestMethods";
import {
  deletePostFailed,
  deletePostStarts,
  deletePostSuccess,
  editPostFailed,
  editPostStarts,
  editPostSuccess,
  getPostFailed,
  getPostStarts,
  getPostSuccess,
  createPostFailed,
  createPostStarts,
  createPostSuccess,
} from "./postSlice";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
} from "./userSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};



export const getPost = async (dispatch) => {
  dispatch(getPostStarts());
  try {
    const res = await publicRequest.get("/posts");
    dispatch(getPostSuccess(res.data));
  } catch (err) {
    dispatch(getPostFailed());
  }
};

export const deletePost = async (id, dispatch) => {
  dispatch(deletePostStarts());
  try {
     await userRequest.delete(`/posts/${id}`);
    dispatch(deletePostSuccess(id));
  } catch (err) {
    dispatch(deletePostFailed());
  }
};

export const editPost = async (id,post,dispatch) => {
  dispatch(editPostStarts());
  try {
     await userRequest.put(`/posts/${id}`,post);
    dispatch(editPostSuccess({id,post}));
  } catch (err) {
    dispatch(editPostFailed());
  }
};

export const createPost = async (post,dispatch) => {
  dispatch(createPostStarts());
  try {
    const res = await userRequest.post(`/posts`,post);
    dispatch(createPostSuccess(res.data));
  } catch (err) {
    dispatch(createPostFailed());
  }
};


