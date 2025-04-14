import React from "react";
import {useNavigate} from  'react-router-dom';
import '../../styles/home/Home.css';
import chemVideo from '../../assets/home/ChemClickVid.mp4'; 

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
            <video autoPlay muted loop playsInline className="bg-video">
                <source src={chemVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
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