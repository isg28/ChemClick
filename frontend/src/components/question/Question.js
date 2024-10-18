import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/question/Question.css';

function Question() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/dashboard');
    };
    return (
        <div className='Question'>
            <div className='QuestionHeader'>
                <img src={require('../../assets/question/ChemClickLogo.png')} className="Logo" />
                <img
                    src={require('../../assets/question/Home.png')} className="Home" onClick={handleHomeClick} style={{ cursor: 'pointer' }}
                />
                <div className='WhiteHeaderBox'>
                    <h2>ChemClick Assignments</h2>
                </div>
            </div>
            <div className='BlueQuestionBox'>
                <div className='WhiteTitleBox'>
                    <h1>Unit 3: Nomenclature:<br />
                        Element Name
                    </h1>
                </div>
                <div className='WhiteQuestionBox'>
                    <h2 className='QuestionText'>What is the name of this element?</h2>
                    <img src={require('../../assets/question/Hydrogen.jpg')} className='ElementImage' />
                    <div className='AnswerContainer'>
                        <h2 className='AnswerText'>The name of this element is:</h2>
                        <input type="text" className="AnswerInput" />
                    </div>
                    <button className="SubmitButton">
                        <h2>Submit</h2>
                    </button>
                </div>

            </div>
            <div className='Mastery'>
                <div className='MasteryWhiteTitleBox'>
                    <h1> Mastery</h1>
                </div>
                <div className='MasteryStarWhiteBox'>
                    <img src={require('../../assets/question/Stars.png')} className='StarsImage' />

                </div>
            </div>
            <div className='Goal'>
                <div className='GoalWhiteTitleBox'>
                    <h1> Goal</h1>
                </div>
                <div className='GoalStarWhiteBox'>
                <img src={require('../../assets/question/Checkmarks.png')} className='CheckmarksImage' />

                </div>
            </div>
            <div className='Progress'>
                <div className='ProgressWhiteTitleBox'>
                    <h1> Progress</h1>
                </div>
                <div className='ProgressBarWhiteBox'>
                    <h1>Current Topic Progress: 33% </h1>
                    <img src={require('../../assets/question/ProgressBar.jpg')} className='ProgressBarImage' img />
                </div>

            </div>
        </div>
    );
}
export default Question;


