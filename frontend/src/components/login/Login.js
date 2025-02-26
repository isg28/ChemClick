import React, {useState} from 'react'
import {useNavigate} from  'react-router-dom';
import '../../styles/login/Login.css';

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
          const response = await fetch('http://localhost:8000/users/login/', {
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
      <div className = 'container'>
        <div className = 'header'>
            <img src = {`${process.env.PUBLIC_URL}/ChemClickLogo.png`} alt = "ChemClick Logo" className = "profile-logo" />
          <div className = 'underline'></div>
        </div>
        
        <div className = 'input-box'>
          <div className = 'inputs'>
            <div className = "Student-ID">STUDENT ID</div>
            <div className = 'input'>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
          </div>
          <div className = 'inputs'>
            <div className = 'Password'>PASSWORD</div>
            <div className = 'input'>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />            
            </div>
          </div>
          <div className = 'options'>
            <div className = 'forgot-password' onClick={() => navigate('/ConfirmEmail')}>Forgot Password?</div>
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