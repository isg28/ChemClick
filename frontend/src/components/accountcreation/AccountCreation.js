import React, {useState} from 'react'
import {useNavigate} from  'react-router-dom';
import '../../styles/accountcreation/AccountCreation.css';
import chemVideo from '../../assets/home/ChemClickVid.mp4'; 


function AccountCreation() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        studentId: '',
        confirmId: '',
        password: '',
        confirmPassword: '',
    });
    
    const [errors, setErrors] = useState({});

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const isLocal = window.location.hostname === 'localhost';

                const BASE_URL = isLocal
                  ? 'http://localhost:8000'
                  : 'https://chemclick-backend.onrender.com';
                
                const response = await fetch(`${BASE_URL}/users/create/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        student_id: formData.studentId,
                        school_email: formData.studentId + "@sanjuan.edu",
                        password: formData.password,
                    }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.message);
                    navigate('/login'); 
                } else {
                    const errorData = await response.json();
                    setErrorMessage(errorData.error || 'Account creation failed');
                    console.error('Account creation failed', errorData);
                }
            } catch (error) {
                setErrorMessage('An error occurred. Please try again.');
                console.error('Error:', error);
            }
            console.log('Form submitted successfully!');
        } else {
            console.log('Form submission failed due to validation errors.');
        }
    };

    const validateForm = (data) => {
        const errors = {};

        if (!data.studentId.trim()) {
            errors.studentId = 'Student ID is required';
        }

        if (data.confirmId !== data.studentId) {
            errors.confirmId = 'Student IDs do not match';
        }

        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }

        if (data.confirmPassword !== data.password) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    return (
        <div className = 'CreateAccount'>
            <video autoPlay muted loop playsInline className="bg-video">
                <source src={chemVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className = 'acc-container'>
                <div className = 'acc-header'>
                    <img src = {`${process.env.PUBLIC_URL}/ChemClickLogo.png`} alt = "ChemClick Logo" className = "acc-profile-logo" />
                    <div className = 'underline'></div>
                </div>

                <div className = 'acc-input-box'>
                    <div className = 'acc-inputs'>
                        <div className = "acc-Student-ID">STUDENT ID</div>
                        <div className = 'acc-input'>
                            <input 
                                type="text" 
                                name="studentId" 
                                value={formData.studentId} 
                                onChange={handleChange} 
                                data-testid="studentId-input"
                            />                      
                        </div> 
                    </div>
                    {errors.studentId && ( 
                                <span className="error-message">
                                    {errors.studentId}
                                </span>)} 
                    <div className = 'acc-inputs'>
                        <div className = "acc-Student-ID">CONFIRM STUDENT ID</div>
                        <div className = 'acc-input'>
                            <input 
                                type="text" 
                                name="confirmId" 
                                value={formData.confirmId} 
                                onChange={handleChange}
                                data-testid="confirmId-input" 
                            />                         
                        </div> 
                    </div>
                    {errors.confirmId && ( 
                                <span className="error-message">
                                    {errors.confirmId}
                                </span>)} 
                    <div className = 'acc-inputs'>
                        <div className = "acc-Password">PASSWORD</div>
                        <div className = 'acc-input'>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange}
                                data-testid="password-input" 
                            />                          
                        </div> 
                    </div>
                    {errors.password && ( 
                            <span className="error-message">
                                {errors.password}
                            </span>)} 
                    <div className = 'acc-inputs'>
                        <div className = "acc-Password">CONFIRM PASSWORD</div>
                        <div className = 'acc-input'>
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                value={formData.confirmPassword} 
                                onChange={handleChange}
                                data-testid="confirmPassword-input" 
                            />                          
                        </div> 
                    </div>
                    {errors.confirmPassword && ( 
                            <span className="error-message">
                                {errors.confirmPassword}
                            </span>)} 
                    {errorMessage&& <p style={{color:'red' }}>{errorMessage}</p>}
                    <div className = 'options'>
                        <div className = 'already-have-account' onClick={() => navigate('/login')}>Already have an account? Login</div>
                        <div className = 'submit-container'></div>
                        <div className = 'acc-submit' onClick = {handleCreateAccount} data-testid="create-account-button">
                            Create Account
                        </div>
                </div>    
            </div>
        </div>
    </div> 
    );
};

export default AccountCreation;