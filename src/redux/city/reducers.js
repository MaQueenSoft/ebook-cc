import {
  GET_ALL_CITY_BEGIN,
  GET_ALL_CITY_SUCCESS,
  GET_ALL_CITY_ERROR,
  ADD_CITY_BEGIN,
  ADD_CITY_SUCCESS,
  ADD_CITY_ERROR,
  GET_CITY_BEGIN,
  GET_CITY_ERROR,
  GET_CITY_SUCCESS,
  UPDATE_CITY_BEGIN,
  UPDATE_CITY_SUCCESS,
  UPDATE_CITY_ERROR,
  DELETE_CITY_BEGIN,
  DELETE_CITY_SUCCESS,
  DELETE_CITY_ERROR,
} from "./constants";

const initState = {
  list: [],
  loading: false,
  error: null,
};

const CityReducer = (state = initState, action) => {
  const { type, data, error } = action;
  switch (type) {
    case GET_ALL_CITY_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_CITY_SUCCESS:
      return {
        ...state,
        list: data,
        loading: false,
      };
    case GET_ALL_CITY_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    case ADD_CITY_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case ADD_CITY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, data],
      };
    case ADD_CITY_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    case GET_CITY_BEGIN:
      return {
        ...state,
        loading: true,
        cityData: "",
      };
    case GET_CITY_SUCCESS:
      return {
        ...state,
        loading: false,
        cityData: data?data:[],
      };
    case GET_CITY_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    case UPDATE_CITY_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CITY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map((ele) => {
          if (ele.city_id === data.city_id) {
            return { ...data };
          } else return ele;
        }),
      };
    case UPDATE_CITY_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    case DELETE_CITY_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CITY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.filter((ele) => ele.city_id !== data),
      };
    case DELETE_CITY_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    default:
      return state;
  }
};

export default CityReducer;
