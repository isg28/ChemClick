import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/passwordreset/NewPassword.css';

function NewPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleNewPassword = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    // Validate password length
    if (newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/users/resetpassword/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Password reset failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again');
      console.error('Error:', error);
    }
  };

  return (
    <div className="NewPassword">
      <div className="container">
        <div className="header">
          <img src={`${process.env.PUBLIC_URL}/ChemClickLogo.png`} alt="ChemClick Logo" className="profile-logo" />
          <div className="underline"></div>
        </div>

        <div className="input-box">
          <div className="inputs">
            <label className="NewPasswordLabel">NEW PASSWORD</label>
            <div className="input">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="inputs">
            <label className="ConfirmPasswordLabel">CONFIRM PASSWORD</label>
            <div className="input">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

          <div className="submit" onClick={handleNewPassword}>RESET PASSWORD</div>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
