import React,{useState,useContext,useEffect} from 'react'
import {AlertContext} from '../../context/alert/AlertState'
import {AuthContext} from '../../context/auth/AuthState'

const Register = props => {
  const alertContext = useContext(AlertContext)
  const  {setAlert } = alertContext

  const authContext = useContext(AuthContext)
  const  {register,error,clearErrors,isAuthenticated} = authContext 

  useEffect(()=>{
    if(isAuthenticated){
      props.history.push('/')
    }

    if(error === 'User already exists'){
      setAlert(error,'danger')
      clearErrors()
    }
    //eslint-disable-next-line
  },[error,isAuthenticated,props.history])

  const [user,setUser] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })

  const {name,email,password,password2} = user

  const onchange = e => setUser({...user,[e.target.name]: e.target.value})
  
  const onSubmit = e =>{
    e.preventDefault()
    if(name === '' || email === '' || password === ''){
      setAlert('Please enter all fields','danger')
    }else if (password !== password2){
      setAlert('Password does not match','danger')
    }else{
      register({name,email,password})
   
    
    }
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
        <form onSubmit = {onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name"  value={name} onChange={onchange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email"  value={email} onChange={onchange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password"  value={password} onChange={onchange} />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Password Confirm</label>
            <input type="password" name="password2"  value={password2} onChange={onchange}  />
          </div>
          <input type="submit" value="Register" className="btn btn-primary btn-block"/>
        </form>
      </h1>
    </div>
  )
}

export default Register
