import axios from 'axios'
import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_Register_REQUEST, USER_Register_FAIL, USER_Register_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST } from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }, //configuring the header. We are sending a content type
        }
        
        //here we are posting email & pw to the below route and awaiting a response
        // the response will be stored in the data var
        //we are also passing config | i guess posting it
        const {data} = await axios.post('api/users/login/', {email,password}, config)

        dispatch({
            // Here we are dispatching success along with the pay
            //load of data 
            type:USER_LOGIN_SUCCESS,
            payload: data
        })

        // we are then setting the localstorage userInfo to be the data
        // we recived from the request
        //when setting a local storage it must be in a string format
        localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {
        
        //when login fails why is the message not displaying ?
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.meessage
            ? error.response.data.meessage
            : error.meessage,
        })
    }
}

export const logout = ()=>(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}




export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.get(`api/users/${id}`, config)

        dispatch({

            type:USER_DETAILS_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.meessage
            ? error.response.data.meessage
            : error.meessage,
        })
    }
}


export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_Register_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const {data} = await axios.post('api/users', {name, email,password}, config)

        dispatch({

            type:USER_Register_SUCCESS,
            payload: data
        })

        dispatch({

            type:USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {
        
        dispatch({
            type: USER_Register_FAIL,
            payload: error.response && error.response.data.meessage
            ? error.response.data.meessage
            : error.meessage,
        })
    }
}





export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.put(`api/users/profile`, user, config)

        dispatch({

            type:USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.meessage
            ? error.response.data.meessage
            : error.meessage,
        })
    }
}