import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointSix.css';
import { useNavigate } from 'react-router-dom';

function LessonOnePointSix() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/dashboard');
    };

    const rulerTicks = [
        { value: "0", position: 0 },
        { value: "0.5", position: 8.27 },
        { value: "1", position: 16.54 },
        { value: "1.5", position: 24.895 },
        { value: "2", position: 33.25 },
        { value: "2.5", position: 41.6 },
        { value: "3", position: 49.95 },
        { value: "3.5", position: 58.36 },
        { value: "4", position: 66.77 },
        { value: "4.5", position: 75.11 },
        { value: "5", position: 83.45 },
        { value: "5.5", position: 91.675 },
        { value: "6", position: 99.9 }
    ];

    const [objectLength, setObjectLength] = useState(rulerTicks[Math.floor(Math.random() * rulerTicks.length)].value);
    const [objectPosition, setObjectPosition] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    useEffect(() => {
        setObjectPosition(parseFloat(objectLength) * 16.54); // Calculate initial position.
    }, [objectLength]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) { // Validate input to allow only numbers and a single decimal
            setUserAnswer(value);
        }
    };

    const validateAnswer = () => {
        const correctAnswer = parseFloat(objectLength);
        const userAnswerNum = parseFloat(userAnswer);

        const validFormat = /^\d(\.\d)?$/.test(userAnswer);
        if (!validFormat) {
            setFeedback("Be sure to use the correct amount of digits: #.#");
            setFeedbackClass('incorrect');
            return;
        }

        if (userAnswerNum === correctAnswer) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
        } else {
            setFeedback("The answer is incorrect. Please try again.");
            setFeedbackClass('incorrect');
        }
    };

    const handleSubmitAnswer = () => {
        validateAnswer();
    };

    const handleNextQuestion = () => {
        const newLength = rulerTicks[Math.floor(Math.random() * rulerTicks.length)].value;
        setObjectLength(newLength);
        setObjectPosition(parseFloat(newLength) * 16.54);
        setUserAnswer('');
        setFeedback('');
        setFeedbackClass('hidden');
        setIsAnswerCorrect(false);
    };

    const handleDraggerMouseDown = (e) => {
        const rulerElement = document.querySelector('.lesson-one-point-six-ruler');
        const rulerRect = rulerElement.getBoundingClientRect();

        const handleMouseMove = (moveEvent) => {
            const offsetX = moveEvent.clientX - rulerRect.left;
            const clampedOffsetX = Math.max(0, Math.min(offsetX, rulerRect.width));
            const positionPercentage = (clampedOffsetX / rulerRect.width) * 100;

            setObjectPosition(positionPercentage);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className='lesson-one-point-six'>
            <div className='questionheader'>
                <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
                <img src={require('../../assets/question/Home.png')} className='homelines' onClick={handleHomeClick} alt="Home Lines" />
                <div className='insideheader'><h1>ChemClick Assignments</h1></div>
            </div>

            <div className='lesson-one-point-six-box'>
                <div className='lesson-one-point-six-box-title'>
                    <h1>Unit One: Uncertainty in Measurement - Hundredths Value</h1>
                </div>

                <div className='lesson-one-point-six-content'>
                    <p className='lesson-one-point-six-prompt'>
                        Drag the object above the ruler to line it up with a measurement. Then enter its length.
                    </p>

                    <div className="lesson-one-point-six-ruler-container">
                        <img 
                            src={require('../../assets/question/RulerH.png')} 
                            className="lesson-one-point-six-ruler" 
                            alt="Ruler" 
                        />
                        <img
                            src={require('../../assets/question/ObjectImage.jpg')} // Replace with your object image path
                            className="lesson-one-point-six-static-object"
                            alt="Object"
                        />
                        <div
                            className="lesson-one-point-six-dragger"
                            style={{ left: `${objectPosition}%` }} // Position dynamically
                            onMouseDown={handleDraggerMouseDown} // Start drag logic
                        ></div>
                    </div>

                    <hr className="separator" />
                    <div className='lesson-one-point-six-question'>
                        <h1>Enter the object's length:</h1>
                        <input 
                            type='text' 
                            className='lesson-one-point-six-input' 
                            placeholder='Enter the measurement here' 
                            value={userAnswer}
                            onChange={handleInputChange} 
                        /> 
                    </div>
                </div>

                <div className="submit-feedback-container">
                    {!isAnswerCorrect && (
                        <button className='lesson-one-point-six-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                    )}
                    {isAnswerCorrect && (
                        <button className='lesson-one-point-six-next' onClick={handleNextQuestion}>Next Question</button>
                    )}
                    <span className={`lesson-one-point-six-feedback ${feedbackClass}`}>{feedback}</span>
                </div>
            </div>

            <div className='masterybox'>
                <div className='masteryboxtitle'><h1>Mastery</h1></div>
                <div className='masteryboxstars'>
                    <img src={require('../../assets/question/Stars.png')} className='masterystars' alt="Mastery Stars" />
                </div>
            </div>
            <div className='goalbox'>
                <div className='goalboxtitle'><h1>Goal</h1></div>
                <div className='goalboxchecks'>
                    <img src={require('../../assets/question/Checkmarks.png')} className='goalchecks' alt="Goal Checks" />
                </div>
            </div>
            <div className='progressbox'>
                <div className='progressboxtitle'><h1>Progress</h1>
                    <h2>Current Topic Progress: 50%</h2>
                </div>
                <div className='progressboxbar'>
                    <img src={require('../../assets/question/ProgressBar.jpg')} className='progressbar' alt="Progress Bar" />
                </div>
            </div>
        </div>
    );
}

export default LessonOnePointSix;
