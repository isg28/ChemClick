import React, {useState} from 'react'
import {useNavigate} from  'react-router-dom';
import '../../styles/accountcreation/AccountCreation.css';

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
                const response = await fetch('http://localhost:8000/users/create/', {
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
                    <div className = 'inputs'>
                        <div className = "Student-ID">CONFIRM STUDENT ID</div>
                        <div className = 'input'>
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
                    <div className = 'inputs'>
                        <div className = "Password">PASSWORD</div>
                        <div className = 'input'>
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
                    <div className = 'inputs'>
                        <div className = "Password">CONFIRM PASSWORD</div>
                        <div className = 'input'>
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
                        <div className = 'already-have-account' onClick={() => navigate('/login')}>Already Have Account? Login</div>
                        <div className = 'submit-container'></div>
                        <div className = 'submit' onClick = {handleCreateAccount} data-testid="create-account-button">
                            CREATE ACCOUNT
                        </div>
                </div>    
            </div>
        </div>
    </div> 
    );
};

export default AccountCreation;