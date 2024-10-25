import React, {useState} from 'react'
import {useNavigate} from  'react-router-dom';
import '../../styles/accountcreation/AccountCreation.css';

function AccountCreation() {
    const navigate = useNavigate();

    const [studentId, setStudentId] = useState('');
    const [schoolEmail, setSchoolEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateAccount = async () => {
        try {
            const response = await fetch('http://localhost:8000/users/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_id: studentId,
                    school_email: schoolEmail,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                navigate('/login'); 
            } else {
                console.error('Account creation failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className = 'CreateAccount'>
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
                                id="studentId" 
                                value={studentId} 
                                onChange={(e) => setStudentId(e.target.value)} 
                            />                        
                        </div>
                    </div>
                    <div className = 'inputs'>
                        <div className = "School-Email">SCHOOL EMAIL</div>
                        <div className = 'input'>
                            <input 
                                type="email" 
                                id="schoolEmail" 
                                value={schoolEmail} 
                                onChange={(e) => setSchoolEmail(e.target.value)} 
                            />                       
                        </div>
                    </div>
                    <div className = 'inputs'>
                        <div className = "Password">PASSWORD</div>
                        <div className = 'input'>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />                        
                        </div>
                    </div>
                    <div className = 'options'>
                        <div className = 'already-have-account' onClick={() => navigate('/login')}>Already Have Account?Login</div>
                        <div className = 'submit-container'>
                    </div>
                </div>

                <div className = 'submit' onClick = {handleCreateAccount}>CREATE ACCOUNT</div>    
            </div>
        </div>
    </div>
    );
};

export default AccountCreation;