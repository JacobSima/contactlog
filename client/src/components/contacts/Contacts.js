import React, { useContext, Fragment,useEffect } from 'react'
import {ContactContext} from '../../context/contact/ContactState'
import {AuthContext} from '../../context/auth/AuthState'
import ContactItem  from './ContactItem'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import Spinner from '../layout/Spinner'


const Contacts = () => {
  const contactContext = useContext(ContactContext)
  const {contacts,filtered,getContacts} = contactContext

  const authContext = useContext(AuthContext)
  const {loading} = authContext

  useEffect(()=>{
  
    getContacts()
    
    // eslint-disable-next-line
  },[])
   
  if(contacts !== null && contacts.length === 0 && !loading){
    return <h4>Please Add a contact </h4>
  }

  const filteredOut = ()=>{
    if(filtered){
      return filtered.map(contact =>(
      <CSSTransition key = {contact._id} timeout={500} classNames="item" >
         <ContactItem contact={contact}/>
      </CSSTransition>
      ))
    }else{ 
     return contacts.map(contact =>(
      <CSSTransition key = {contact._id} timeout={500} classNames="item">
        <ContactItem  contact={contact} />
     </CSSTransition>
     ))
    }
  }

  return <Fragment>
    {contacts !== null && !loading?(<TransitionGroup>
      {filteredOut()} 
    </TransitionGroup>):<Spinner/>}
    
     </Fragment>
  
  
}

export default Contacts
