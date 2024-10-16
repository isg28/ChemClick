import React from 'react'
import {useNavigate} from  'react-router-dom';
import '../../styles/accountcreation/AccountCreation.css';

function AccountCreation() {
    const navigate = useNavigate();

    const handleCreateAccount = () => {
        navigate('/dashboard');
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
                            <input type = "Student ID" />
                        </div>
                    </div>
                    <div className = 'inputs'>
                        <div className = "School-Email">SCHOOL EMAIL</div>
                        <div className = 'input'>
                            <input type = "School-Email" />
                        </div>
                    </div>
                    <div className = 'inputs'>
                        <div className = "Password">PASSWORD</div>
                        <div className = 'input'>
                            <input type = "Password" />
                        </div>
                    </div>
                    <div className = 'options'>
                        <div className = 'already-have-account'>Already Have Account?Login</div>
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