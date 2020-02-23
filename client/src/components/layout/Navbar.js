import React,{Fragment,useContext, useEffect} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/auth/AuthState'
import {ContactContext} from '../../context/contact/ContactState'

const Navbar = ({title,icon}) => {

  const authContext = useContext(AuthContext)
  const {isAuthenticated,user,logoutUser} = authContext

  const contactContext = useContext(ContactContext)
  const {clearContacts} = contactContext

  const onLogOut = () =>{
    logoutUser()
    clearContacts()
  }


  const authLinks =(
    <Fragment>
      <li>Hello {user && user.user.name}</li>
      <li>
        <a href="#!" onClick = {onLogOut}>
          <i className="fas fa-sign-out-alt">
            <span className="hide-sm">Logout</span>
          </i>
        </a>
      </li> 
    </Fragment>
  )


  const guestLinks = (
    <Fragment>
        {/* <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li> */}
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/Login'>Login</Link>
        </li>
    </Fragment>
  )

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}/> {title}
      </h1>
      <ul>
        {isAuthenticated? authLinks:guestLinks}
      </ul>
    </div>
  )
}

Navbar.propTypes = {
   title:PropTypes.string.isRequired,
   icon:PropTypes.string,
}

Navbar.defaultProps = {
  title:"Contact Logger",
  icon:"fas fa-id-card-alt"
}

export default Navbar
