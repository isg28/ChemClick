import React from 'react';
import '../../styles/dashboard/ClickToBegin.css';
import { useNavigate } from 'react-router-dom';

const ClickToBegin = () => {
    const navigate = useNavigate();

    const handleClickToBegin = () => {
        navigate('/question');
    };
    return (
        <div className="click-to-begin-container">
            <span className="click-text">Click to Begin</span>
            <img src={`${process.env.PUBLIC_URL}/ChemClickLogo.png`} alt="ChemClick Logo" className="click-logo" onClick = {handleClickToBegin}/>
        </div>
    );
};

export default ClickToBegin;
