import React from "react";
import {useNavigate} from  'react-router-dom';
import '../../styles/congrats/Congrats.css';
import RibbonAward from '../../assets/congrats/RibbonAward.jpg';
import CertificateLayout from '../../assets/congrats/certificate-layout.jpeg';
import { jsPDF } from 'jspdf';


function Congrats() {
    const navigate = useNavigate();

    const handleDash = () => {
        navigate('/dashboard');
    };

    const generatePDF = () => {
        const doc = new jsPDF('Landscape');
        const imgData = new Image();
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
    
        imgData.src = CertificateLayout;
    
        imgData.onload = () => {
            doc.setFontSize(40);
            doc.text(35, 25, "tester");
            
            doc.addImage(imgData, 'JPEG', 0, 0, 297, 210);
            
            doc.setFontSize(12);
            doc.text(115, 120, `Awarded on: ${formattedDate}`);
            
            doc.save("chem-award.pdf");
        };
    
        imgData.src = CertificateLayout;
    };

    return (
        <body>
            <div className="congrats-container">
                <div className="congrats-center-container">
                    <div className="ribbon">
                        <img src = {RibbonAward} alt = "Ribbon Award" className = "ribbon-award" />
                    </div>
                    <div className="congrats-title"> Congratulations! </div>
                    <div className="congrats-text">
                        Congrats on completing the module! Click the button to generate the
                        certificate for this module as proof of completion.
                    </div>
                    <div className="award-button" onClick={generatePDF}>
                        Display Award!
                    </div>
                    <div className="award-button" onClick={handleDash}>
                        Back to Dashboard
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Congrats;