import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  GET_ALL_USERS_BEGIN,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
  ADD_USER_BEGIN,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  GET_USER_BEGIN,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from "./constants";

const user = JSON.parse(localStorage.getItem("user"));

const initState = {
  user: user ? user : null,
  userList: [],
  loading: false,
  error: null,
  userData: "",
};

const AuthReducer = (state = initState, action) => {
  const { type, data, error } = action;
  switch (type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: data,
        loading: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    case LOGOUT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    case GET_ALL_USERS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        userList: [...data],
        loading: false,
      };
    case GET_ALL_USERS_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    case ADD_USER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        userList: [...state.data, data],
        loading: false,
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    case GET_USER_BEGIN:
      return {
        ...state,
        loading: true,
        userData: "",
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: data,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    case UPDATE_USER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userList: state.userList.map((ele) => {
          if (ele.id === data.id) {
            return { ...data };
          } else return ele;
        }),
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
