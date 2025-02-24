import React, {useState} from 'react'
import {useNavigate} from  'react-router-dom';
import '../../styles/teacherlogin/TeacherLogin.css';

function TeacherLogin() {
  const navigate = useNavigate();

  const [teacherId, setTeacherId] = useState('');
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
          const response = await fetch('http://localhost:8000/teacher/teacherlogin/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  teacher_id: teacherId,
                  password: password,
              }),
          });

          if (response.ok) {
              const data = await response.json();
              console.log(data.message);
              localStorage.setItem('role','teacherId', teacherId);
              navigate('/teacherdashboard'); 
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
    <div className = 'TeacherLogin'>
      <div className = 'container-teacher'>
        <div className = 'header-teacher'>
            <img src = {`${process.env.PUBLIC_URL}/ChemClickLogo.png`} alt = "ChemClick Logo" className = "profile-logo" />
          <div className = 'underline-teacher'></div>
        </div>
        
        <div className = 'input-box-teacher'>
          <div className = 'inputs-teacher'>
            <div className = "Student-ID-teacher">TEACHER ID</div>
            <div className = 'input-teacher'>
              <input
                type="text"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
              />
            </div>
          </div>
          <div className = 'inputs-teacher'>
            <div className = 'Password-teacher'>PASSWORD</div>
            <div className = 'input-teacher'>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />            
            </div>
          </div>
          <div className = 'options-teacher'>
            <div className = 'forgot-password-teacher' onClick={() => navigate('/ConfirmEmail')}>Forgot Password?</div>
            <div className = 'submit-container-teacher'>
            </div>
          </div>
          {errorMessage&& <p style={{color:'red' }}>{errorMessage}</p>}
        <div className = 'submit-teacher' onClick = {handleSignIn}>SIGN IN</div>
        
      </div>
    </div>
  </div>
  );
}

export default TeacherLogin;