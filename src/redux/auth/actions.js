
import axios from "axios";
import { toast } from "react-toast";

import {
  LOGIN_BEGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  GET_ALL_USERS_BEGIN,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
  ADD_USER_BEGIN,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_ERROR
} from "./constants";

const API = process.env.REACT_APP_API_URL;

export const getHeaders = () => (dispatch, getState) => {
  const {
    auth: { user },
  } = getState();
  return {
    //Authorization: `Bearer ${user.access_token}`,
    Authorization: `Bearer `,
  };
};

// ** Handle User Login
export const handleLogin = (data) => async (dispatch) => {
  
  try {
    dispatch({
      type: LOGIN_BEGIN,
    });
    //const { data } = await axios.post(`${API}/api/auth/login`, body);
    //localStorage.setItem("user", JSON.stringify(body));
    console.log("handleLogin action", data)
    dispatch({
      type: LOGIN_SUCCESS,
      data: data,
    });
  } catch (error) {
    const msg = "Failed to login"; //error.response.data.message;
    toast.error(msg);
    dispatch({
      type: LOGIN_ERROR,
      error: msg,
    });
  }
};

// ** Handle User Logout
export const handleLogout = () => async (dispatch) => {
  console.log("REMOVE ITEM");
  try {
    dispatch({
      type: LOGOUT_BEGIN,
    });
    console.log("handleLogout dispatch");
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    const msg = error.response.data.message;
    toast.error(msg);
    dispatch({
      type: LOGOUT_ERROR,
      error: msg,
    });
  }
};

