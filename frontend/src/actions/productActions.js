import axios from 'axios'

//Imports the three types from productConstants from there productReducers
import {
    PRODUCT_LIST_REQUEST,
     PRODUCT_LIST_SUCCESS, 
     PRODUCT_LIST_FAIL,
     PRODUCT_DETAILS_REQUEST,
     PRODUCT_DETAILS_SUCCESS,
     PRODUCT_DETAILS_FAIL}from '../constants/productConstants' 

//Exporting a function that does Request, Success or failure
export const listProducts = () => async (dispatch) =>{

    try {
        //Makes a request to the endpoint
        dispatch({ type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get('/api/products')

        // On success, we load the payload w the data we got back
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        //on error we dispatch the fail reducer and fill the payload with error message either a cusomized one or a non customized one
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.meessage
            ? error.response.data.meessage
            : error.meessage,
        })
        
    }
}

export const listProductsDetails = (id) => async (dispatch) =>{

    try {
        //Makes a request to the endpoint
        dispatch({ type: PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/products/${id}`)

        // On success, we load the payload w the data we got back
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        //on error we dispatch the fail reducer and fill the payload with error message either a cusomized one or a non customized one
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.meessage
            ? error.response.data.meessage
            : error.meessage,
        })
        
    }
}