import React, {useReducer, createContext } from 'react'
import alertReducer from './alertReducer'
import {SET_ALERT,REMOVE_ALERT} from '../types'
import uuid from 'uuid'

export const AlertContext = createContext()

const AlertState = props =>{
 const initialState = []

  const [state,dispatch] = useReducer(alertReducer,initialState)

  //actions
  
  // Set alert
  const setAlert = (msg,type,timeout=5000)=>{
    const id = uuid.v4() 
    dispatch({type:SET_ALERT,payload:{msg,type,id}})

    setTimeout(()=> dispatch({type:REMOVE_ALERT,payload:id}),timeout)
  }



  return <AlertContext.Provider
   value = {{
     alerts:state,
     setAlert
   }}
  >
    {props.children}
  </AlertContext.Provider>
}

export default AlertState