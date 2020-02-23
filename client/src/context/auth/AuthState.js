import React,{createContext, useReducer} from 'react'
import authReducer from './authReducer'
import axios from 'axios'
import setAuthToken  from '../../utils/setAuthToken'
import { 
  REGISTER_SUCCESS, 
  REGISTER_FAIL,
  CLEAR_ERRORS, 
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../types'

export const  AuthContext = createContext()

const AuthState = props =>{

  const initialState ={
     token:localStorage.getItem('token'),
     isAuthenticated:null,
     loading:true,
     errors:null,
     user:null
  }

  const [state, dispatch] = useReducer(authReducer,initialState)
  
  // Actions
  // Load User
    const loadUser = async ()=>{
      // @toto-load token into glonal headers
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }

      try {
        const res = await axios.get('/api/auth')
        dispatch({type:USER_LOADED,payload:res.data})
      } catch (error) {
        dispatch({type:AUTH_ERROR})
      }
    }
  // Register User
  const register = async formData =>{
    const config ={
      headers:{'Content-Type':'application/json'}}

    try {
      const res = await axios.post('/api/users',formData,config)
      dispatch ({
        type:REGISTER_SUCCESS,
        payload:res.data
      })

      // load current login or registered user
      loadUser()

    } catch (error) {
       dispatch({
         type:REGISTER_FAIL,
         payload:error.response.data.msg
       })
    }
  }


  // Login User
  const loginUser = async formData =>{
    const config ={
      headers:{'Content-Type':'application/json'}}

    try {
      const res = await axios.post('/api/auth',formData,config)
      dispatch ({
        type:LOGIN_SUCCESS,
        payload:res.data
      })

      // load current login or registered user
      loadUser()

    } catch (error) {
       dispatch({
         type:LOGIN_FAIL,
         payload:error.response.data.msg
       })
    }
  }

  // Logout
  const logoutUser = ()=> dispatch({type:LOGOUT})

  // Clear Errors
  const clearErrors = ()=> dispatch({type:CLEAR_ERRORS})


  return <AuthContext.Provider
   value = {{
    token:state.token,
    user:state.user,
    isAuthenticated:state.isAuthenticated,
    loading:state.loading,
    error:state.error,
    register,
    loadUser,
    loginUser,
    logoutUser,
    clearErrors
    
   }}
  >
    {props.children}
  </AuthContext.Provider>
}

export default AuthState 