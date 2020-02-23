import React,{createContext, useReducer} from 'react'
import contactReducer from './contactReducer'
import axios from 'axios'
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    SET_ALERT,
    REMOVE_ALERT} from '../types'

export const ContactContext = createContext()

const ContactState = props =>{
  // All the Contact States goes here
  const initialState ={
      contacts:null,
      current:null,
      filtered:null,
      error:null
  }

  const [state,dispatch] = useReducer(contactReducer,initialState)

  // All the Contact Function goes here or Actions

  // Get contacts
  const getContacts = async () => {
      
    try {
      const res = await axios.get('/api/contacts')
      dispatch({type:GET_CONTACTS,payload:res.data.contacts})  
    }catch (error) {
      dispatch({type:CONTACT_ERROR,payload:error.response.msg})     
    }

  }
    
  // Add Contact
     const addContact = async contact => {
      
       const config ={headers:{'Content-Type':'application/json'}}
       try {
         const res = await axios.post('/api/contacts',contact,config)
         dispatch({type:ADD_CONTACT,payload:res.data.contact})  
       }catch (error) {
         dispatch({type:CONTACT_ERROR,payload:error.response.msg})     
       }

     }
   // Update Contact
    const updateContact = async contact =>{
      const config ={headers:{'Content-Type':'application/json'}}
       try {
         const res = await axios.put(`/api/contacts/${contact._id}`,contact,config)
         dispatch({type:UPDATE_CONTACT,payload:res.data.contact}) 
       }catch (error) {
         dispatch({type:CONTACT_ERROR,payload:error.response.msg})     
       }
    }

  // Delete Contact
     const deleteContact = async id =>{
      try { 
        await axios.delete(`/api/contacts/${id}`)
        dispatch({type:DELETE_CONTACT,payload:id}) 
      }catch (error) {
        dispatch({type:CONTACT_ERROR,payload:error.response.msg})     
      }
       
     }


  // Set Current Contact
    const setCurrent = contact =>{
      dispatch({type:SET_CURRENT,payload:contact})
    }

  // Clear Current Contact
    const clearCurrent = () =>{
      dispatch({type:CLEAR_CURRENT})
    }


  // Filter Contact
  const filterContacts = text =>{
    dispatch({type:FILTER_CONTACTS,payload:text})
  }

  // Clear Filter Contact
  const clearFilter = () =>{
    dispatch({type:CLEAR_FILTER})
  }

  // clear Contacts
  const clearContacts = ()=> dispatch({type:CLEAR_CONTACTS})

   
  return <ContactContext.Provider
        value ={{
          contacts:state.contacts,
          error:state.error,
          addContact,
          deleteContact,
          current:state.current, 
          setCurrent,
          clearCurrent,
          updateContact,
          filtered:state.filtered,
          filterContacts,
          clearFilter,
          getContacts,
          clearContacts,
         

        }}
       >
  {props.children}
  </ContactContext.Provider>
}

export default ContactState