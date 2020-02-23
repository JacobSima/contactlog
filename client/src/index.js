import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContactState from './context/contact/ContactState'
import AuthState  from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'



ReactDOM.render(
  <AuthState>
    <ContactState>
      <AlertState>
      <App />
      </AlertState>
    </ContactState>
  </AuthState>
  
  
  , document.getElementById('root'));


