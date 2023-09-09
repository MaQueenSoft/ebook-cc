/* eslint-disable */
import axios from 'axios'
import { getHeaders } from '../auth/actions'
import { toast } from 'react-toast'
import { supabase } from "../../supabase";
import {
  GET_ALL_CITY_BEGIN,
  GET_ALL_CITY_SUCCESS,
  GET_ALL_CITY_ERROR,
  ADD_CITY_BEGIN,
  ADD_CITY_SUCCESS,
  ADD_CITY_ERROR,
  GET_CITY_BEGIN,
  GET_CITY_SUCCESS,
  GET_CITY_ERROR,
  UPDATE_CITY_BEGIN,
  UPDATE_CITY_SUCCESS,
  UPDATE_CITY_ERROR,
  DELETE_CITY_BEGIN,
  DELETE_CITY_SUCCESS,
  DELETE_CITY_ERROR
} from './constants'

const API = process.env.REACT_APP_API_URL

export const getAllCitys = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_CITY_BEGIN
    })
    
    const { data } = await supabase.from('m_city').select(`
    *,
    
    m_state:city_state_id (
      state_name
    )
    
  `).eq("city_status", 1)
    console.log("getAllCitys", data)

    dispatch({
      type: GET_ALL_CITY_SUCCESS,
      data: data ? data : []
    })
  }
  catch (error) {
    const msg = error.response.data.message;
    toast.error(msg)
    console.log(error)
    dispatch({
      type: GET_ALL_CITY_ERROR,
      error: msg
    })
  }
}

export const addCity = (body) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CITY_BEGIN
    })

    const city_status = true;
    const { data } = await supabase.from('m_city').insert({
      city_name: body.city_name,
      city_state_id: body.city_state_id,
      city_status
    }).select()

    console.log(data[0])
    toast.success("City added successfully!")

    dispatch({
      type: ADD_CITY_SUCCESS,
      data: data[0]
    })
  }
  catch (error) {
    console.log(error.response)
    const msg = error.response.data.message;
    toast.error(msg)
    dispatch({
      type: ADD_CITY_ERROR,
      error: msg
    })
  }
}

export const getCityWithId = (city_id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CITY_BEGIN
    })

    const { data } = await supabase.from('m_city').select().eq("city_id", parseInt(city_id)).maybeSingle();

    console.log("GET_CITY_BEGIN : ", data)
    dispatch({
      type: GET_CITY_SUCCESS,
      data: data
    })
  }
  catch (error) {
    console.log(error.response)
    const msg = error.response.data.message;
    toast.error(msg)
    dispatch({
      type: GET_CITY_ERROR,
      error: msg
    })
  }
}

export const updateCity = (city_id, body) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CITY_BEGIN
    })

    const { data, error } = await supabase.from('m_city').upsert({
      city_id,
      city_name: body.city_name,
      city_state_id: body.city_state_id,
      city_status: body.city_status,
    }).select()

    console.log(data[0])
    toast.success("City updated successfully!")
    dispatch({
      type: UPDATE_CITY_SUCCESS,
      data: data[0]
    })
  }
  catch (error) {
    const msg = error.response.data.message;
    toast.error(msg)
    dispatch({
      type: UPDATE_CITY_ERROR,
      error: msg
    })
  }
}

export const deleteCity = (city_id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CITY_BEGIN
    })
    const city_status = 0;
    const { data, error } = await supabase.from('m_city').upsert({
      city_id,
      city_status
    }).select()

    if (data) {
      toast.success("City deleted successfully!")
      dispatch({
        type: DELETE_CITY_SUCCESS,
        data: city_id
      })
    }
  }
  catch (error) {
    const msg = error.response.data.message;
    toast.error(msg)
    dispatch({
      type: DELETE_CITY_ERROR,
      error: msg
    })
  }
}