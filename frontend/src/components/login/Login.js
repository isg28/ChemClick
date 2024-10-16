import React from 'react'
import {useNavigate} from  'react-router-dom';
import '../../styles/login/Login.css';

function Login() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/dashboard');
  };

  return (
    <div className = 'Login'>
      <div className = 'container'>
        <div className = 'header'>
            <img src = {`${process.env.PUBLIC_URL}/ChemClickLogo.png`} alt = "ChemClick Logo" className = "profile-logo" />
          <div className = 'underline'></div>
        </div>
        
        <div className = 'input-box'>
          <div className = 'inputs'>
            <div className = "Student-ID">STUDENT ID</div>
            <div className = 'input'>
              <input type = "Student ID" />
            </div>
          </div>
          <div className = 'inputs'>
            <div className = 'Password'>PASSWORD</div>
            <div className = 'input'>
              <input type = "Password" />
            </div>
          </div>
          <div className = 'options'>
            <div className = 'forgot-password'>Forgot Password?</div>
            <div className = 'create-account'>Create Account</div>
            <div className = 'submit-container'>
          </div>
        </div>
        <div className = 'submit' onClick = {handleSignIn}>SIGN IN</div>
      </div>
    </div>
  </div>
  );
}

export default Login;