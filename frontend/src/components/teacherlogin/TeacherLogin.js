import React, {useState} from 'react'
import {useNavigate} from  'react-router-dom';
import '../../styles/teacherlogin/TeacherLogin.css';
import chemVideo from '../../assets/home/ChemClickVid.mp4'; 


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
              localStorage.removeItem('studentId');
              localStorage.setItem('teacherId', data.teacher_id);
              localStorage.setItem('role', 'teacherId');

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
            <div className = "login-Student-ID">TEACHER ID</div>
            <div className = 'login-input'>
              <input
                type="text"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
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
          {errorMessage&& <p style={{color:'red' }}>{errorMessage}</p>}
        <div className = 'submit' onClick = {handleSignIn}>SIGN IN</div>
        
      </div>
    </div>
  </div>
  );
}

export default TeacherLogin;