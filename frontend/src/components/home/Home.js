import React from "react";
import {useNavigate} from  'react-router-dom';
import '../../styles/home/Home.css';

function Home() {
    const navigate = useNavigate();

    const handleLogIn = () => {
        navigate('/login');
    };

    const handleCreateAcc = () => {
        navigate('/accountcreation');
    };

    const handleTeacherLogIn = () => {
        navigate('/teacherlogin');
    }

    return (
        <body>
            <div className="home-container">
                <div className="main-container">
                    <div className="main-item" id="welcomeTitle">
                        Welcome to ChemClicks
                    </div>
                    <div className="main-item" id="menuOptions">
                        <div className="menu-container">
                            <div className = 'header'>
                                <img src = {`${process.env.PUBLIC_URL}/ChemClickLogo.png`} alt = "ChemClick Logo" className = "home-logo" />
                            </div>

                            <div className = 'home-button' onClick = {handleLogIn}>SIGN IN</div>
                            <div className = 'home-button' onClick = {handleTeacherLogIn}>TEACHER SIGN IN</div>
                            <div className = 'home-button' onClick = {handleCreateAcc}>CREATE ACCOUNT</div>

                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Home;