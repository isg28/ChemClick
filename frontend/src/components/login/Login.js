import React, {useState} from 'react'
import {useNavigate} from  'react-router-dom';
import '../../styles/login/Login.css';
import chemVideo from '../../assets/home/ChemClickVid.mp4'; 


function Login() {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
      setErrorMessage(''); 

      //setting 8 character min req for pw
      if (password.length < 8){
        setErrorMessage("Password must be at least 8 charachters long");
        return;
      }

      try {
        const BASE_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:8000'
        : 'https://chemclick-backend.onrender.com';
      
        const response = await fetch(`${BASE_URL}/users/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_id: studentId,
            password: password,
          }),
        });
      
          if (response.ok) {
              const data = await response.json();
              console.log(data.message);
              localStorage.removeItem('teacherId');

              localStorage.setItem('studentId', studentId);
              localStorage.setItem('role', 'studentId');
              navigate('/dashboard'); 
          } else {
              const errorData = await response.json();
              setErrorMessage(errorData.error ||'Login failed');
          }
      } catch (error) {
          setErrorMessage('An error occurred. Please try again');
          console.error('Error:', error);
      }
  };

  return (
    <div className = 'Login'>
      <video autoPlay muted loop playsInline className="bg-video">
                <source src={chemVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
      <div className = 'login-container'>
        <div className = 'login-header'>
            <img src = {`${process.env.PUBLIC_URL}/ChemClickLogo.png`} alt = "ChemClick Logo" className = "login-profile-logo" />
          <div className = 'underline'></div>
        </div>
        
        <div className = 'login-input-box'>
          <div className = 'login-inputs'>
            <div className = "login-Student-ID">STUDENT ID</div>
            <div className = 'login-input'>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
          </div>
          <div className = 'login-inputs'>
            <div className = 'login-Password'>PASSWORD</div>
            <div className = 'login-input'>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />            
            </div>
          </div>
          <div className = 'options'>
            <div className = 'forgot-password' onClick={() => navigate('/ConfirmEmail')}>Forgot Password</div>
            <div className='create-account' onClick={() => navigate('/accountcreation')}>Create Account</div>
            <div className = 'submit-container'>
            </div>
          </div>
          {errorMessage&& <p style={{color:'red' }}>{errorMessage}</p>}
        <div className = 'submit' onClick = {handleSignIn}>SIGN IN</div>
      </div>
    </div>
  </div>
  );
}

export default Login;