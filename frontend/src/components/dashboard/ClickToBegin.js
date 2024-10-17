import React from 'react';
import '../../styles/dashboard/ClickToBegin.css';

const ClickToBegin = () => {
    return (
        <div className="click-to-begin-container">
            <span className="click-text">Click to Begin</span>
            <img src={`${process.env.PUBLIC_URL}/ChemClickLogo.png`} alt="ChemClick Logo" className="click-logo" />
        </div>
    );
};

export default ClickToBegin;
