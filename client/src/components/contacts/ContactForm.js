import React,{useState, useContext,useEffect, Fragment} from 'react'
import {ContactContext} from '../../context/contact/ContactState'


const ContactForm = () => {

  const contactContext = useContext(ContactContext)
  const {addContact,current,clearCurrent,updateContact} =contactContext

  useEffect(()=>{
    if(current !== null){
      setContact(current)
    }else{
      setContact({
        name:'',
        email:'',
        phone:'',
        type:'personal'
      })
    }
  },[contactContext,current])

  const [contact,setContact] = useState({
    name:'',
    email:'',
    phone:'',
    type:'personal'
  })
  const {name,email,phone,type} = contact

  const onchange = e => setContact({...contact,[e.target.name]:e.target.value})

  const onSubmit = e =>{
    e.preventDefault() 
    current?(updateContact(contact)):(addContact(contact))

    // clear fields
    clearAll()
    
  }

  const clearAll = (e) =>{
    clearCurrent()
  }

  return (
    <Fragment>
    <form onSubmit={onSubmit}>
     <h2 className="text-primary">{current ?'Update Contact':'Add Contact'}</h2>
      <input type="text" placeholder="Name" name="name" value={name} onChange ={onchange}/>

      <input type="email" placeholder="Email" name="email" value={email} onChange ={onchange}/>

      <input type="text" placeholder="Phone" name="phone" value={phone} onChange ={onchange}/>
      <h5>Contact Types</h5>

      <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange ={onchange}/> Personal{' '}

      <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange ={onchange}/> Professional
      <div>
        <input type="submit" value={current ?'Update Contact':'Add Contact'} className="btn btn-primary btn-block"/>
      </div>
    </form>
    {current && (<div>
      <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
      </div>)}
     </Fragment>
  )
}

export default ContactForm
