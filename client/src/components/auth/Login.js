import React,{useState, useContext,useEffect} from 'react'
import {AuthContext} from '../../context/auth/AuthState'
import {AlertContext} from '../../context/alert/AlertState'

const Login = props => {

  const authContext = useContext(AuthContext)
  const {loginUser,isAuthenticated,error,clearErrors} = authContext
  const alertContext = useContext(AlertContext)
  const {setAlert} = alertContext

  useEffect(()=>{
    if(isAuthenticated){
      props.history.push('/')
    }
    if(error){
      setAlert(error,'danger')
      clearErrors()
     }
  },[error,isAuthenticated,props.history])

  const [user,setUser] = useState({
    email:'',
    password:''
  })

  const {email,password} = user

  const onchange = e => setUser({...user,[e.target.name]: e.target.value})
  
  const onSubmit = async e =>{
    e.preventDefault()
    
    if(email === '' || password=== ''){
      setAlert('Please fill all fields','danger')
      return
    }
    loginUser({email,password}) 
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
        <form onSubmit = {onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email"  value={email} onChange={onchange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password"  value={password} onChange={onchange}/>
          </div>
          <input type="submit" value="Login" className="btn btn-primary btn-block"/>
        </form>
      </h1>
    </div>
  )
}

export default Login
