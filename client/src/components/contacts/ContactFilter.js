import React, { useContext , useRef ,useEffect} from 'react'
import {ContactContext} from '../../context/contact/ContactState'

const ContactFilter = () => {
  const contactContext = useContext(ContactContext)
  const {filterContacts,clearFilter,filtered} = contactContext
  const text = useRef('')

  useEffect(()=>{
    if(filtered === null){ text.current.value = ''}
  },[filtered])

  
  const onchange = e =>{
     if(text.current.value !== ''){
        filterContacts(e.target.value)
     }else{
      clearFilter()
     }    
  }

  return (
    <form>
       <input type="text" ref={text} placeholder="Filter Contacts..." onChange={onchange}/>
    </form>
  )
}

export default ContactFilter
