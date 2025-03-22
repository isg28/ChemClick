import React, {useState} from 'react'
import {useNavigate} from  'react-router-dom';
import '../../styles/passwordreset/ConfirmEmail.css';

function ConfirmEmail() {
		const navigate = useNavigate();
		const [email, setEmail] = useState('');
		const [errorMessage, setErrorMessage] = useState('');
		const [successMessage, setSuccessMessage] = useState('');
	
		const handleConfirmEmail = async () => {
      setErrorMessage('');
			setSuccessMessage('');
	
			//temp code for showing UI
			const constantVerificationCode = "123456";

			/*
			// Ensure verification code is provided
			if (!constantVerificationCode) {
				setErrorMessage("Please enter the verification code");
				return;
			}
			*/
			try {
				const response = await fetch('http://localhost:8000/users/verify/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: email,
						//verification_code: constantVerificationCode, //change constantVerificationCode when emailed verif is set up
					}),
				});
	
				if (response.ok) {
					setSuccessMessage("Verification successful! Redirecting...");
					setTimeout(() => navigate('/NewPassword'), 2000); // Redirect after 2 seconds
				} else {
					const errorData = await response.json();
					setErrorMessage(errorData.error || 'Verification failed');
				}
			} catch (error) {
				setErrorMessage('An error occurred. Please try again');
				console.error('Error:', error);
			}
		};
	
		return (
			<div className="ConfirmEmail">
				<div className="login-container">
					<div className="login-header">
						<img src={`${process.env.PUBLIC_URL}/ChemClickLogo.png`} alt="ChemClick Logo" className="login-profile-logo" />
						<div className="underline"></div>
					</div>
	
					<div className="login-input-box">
						<div className="login-inputs">
							<label className="Email">EMAIL</label>
							<div className="login-input">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>
	
						<div className="login-inputs">
							<label className="VerificationCode">VERIFICATION CODE</label>
							<div className="login-input">
								<input
									type="text"
									//replace with actual verification code when process is set up
									placeholder="Enter Verification Code"
									onChange={() => {}}  // Ignore user input to keep it constant
								/>
							</div>
						</div>
						
						{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
						{successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
	
						<div className="submit" onClick={handleConfirmEmail}>VERIFY</div>
					</div>
				</div>
			</div>
		);
	}
	
	export default ConfirmEmail;