import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointEight.css';
import { useNavigate } from 'react-router-dom';

function LessonOnePointEight() {
    const navigate = useNavigate();

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const positions = [
        { value: "0", position: -103.5, type: 'on tick' },
        { value: "0.1", position: -104.5, type: 'close to lower' },
        { value: "0.2", position: -106.3, type: 'close to lower' },
        { value: "0.3", position: -107.6, type: 'close to lower' },
        { value: "0.4", position: -108.9, type: 'close to lower' },
        { value: "0.5", position: -110.1, type: 'centered' },
        { value: "0.6", position: -111.4, type: 'close to upper' },
        { value: "0.7", position: -112.5, type: 'close to upper' },
        { value: "0.8", position: -114, type: 'close to upper' },
        { value: "0.9", position: -115.9, type: 'close to upper' },
        { value: "1.0", position: -117.2, type: 'on tick' },
        { value: "1.1", position: -118.4, type: 'close to lower' },
        { value: "1.2", position: -119.6, type: 'close to lower' },
        { value: "1.3", position: -121, type: 'close to lower' },
        { value: "1.4", position: -122.5, type: 'close to lower' },
        { value: "1.5", position: -123.9, type: 'centered' },
        { value: "1.6", position: -125.1, type: 'close to upper' },
        { value: "1.7", position: -126.5, type: 'close to upper' },
        { value: "1.8", position: -127.8, type: 'close to upper' },
        { value: "1.9", position: -129.7, type: 'close to upper' },
        { value: "2.0", position: -131.5, type: 'on tick' },
        { value: "2.1", position: -132.5, type: 'close to lower' },
        { value: "2.2", position: -133.7, type: 'close to lower' },
        { value: "2.3", position: -135.2, type: 'close to lower' },
        { value: "2.4", position: -136.4, type: 'close to lower' },
        { value: "2.5", position: -137.7, type: 'centered' },
        { value: "2.6", position: -139, type: 'close to upper' },
        { value: "2.7", position: -140.5, type: 'close to upper' },
        { value: "2.8", position: -142, type: 'close to upper' },
        { value: "2.9", position: -143.5, type: 'close to upper' },
        { value: "3.0", position: -145.2, type: 'on tick' },
        { value: "3.1", position: -146.5, type: 'close to lower' },
        { value: "3.2", position: -148, type: 'close to lower' },
        { value: "3.3", position: -149.5, type: 'close to lower' },
        { value: "3.4", position: -150.7, type: 'close to lower' },
        { value: "3.5", position: -151.7, type: 'centered' },
        { value: "3.6", position: -153.2, type: 'close to upper' },
        { value: "3.7", position: -154.5, type: 'close to upper' },
        { value: "3.8", position: -156, type: 'close to upper' },
        { value: "3.9", position: -158, type: 'close to upper' },
        { value: "4.0", position: -159, type: 'on tick' },
        { value: "4.1", position: -160, type: 'close to lower' },
        { value: "4.2", position: -161.5, type: 'close to lower' },
        { value: "4.3", position: -163, type: 'close to lower' },
        { value: "4.4", position: -164.5, type: 'close to lower' },
        { value: "4.5", position: -165.7, type: 'centered' },
        { value: "4.6", position: -167, type: 'close to upper' },
        { value: "4.7", position: -168.5, type: 'close to upper' },
        { value: "4.8", position: -170, type: 'close to upper' },
        { value: "4.9", position: -171.3, type: 'close to upper' },
        { value: "5.0", position: -172.8, type: 'on tick' },
        { value: "5.1", position: -174.2, type: 'close to lower' },
        { value: "5.2", position: -175.5, type: 'close to lower' },
        { value: "5.3", position: -177, type: 'close to lower' },
        { value: "5.4", position: -178.2, type: 'close to lower' },
        { value: "5.5", position: -179.5, type: 'centered' },
        { value: "5.6", position: -181, type: 'close to upper' },
        { value: "5.7", position: -182.5, type: 'close to upper' },
        { value: "5.8", position: -184, type: 'close to upper' },
        { value: "5.9", position: -185.5, type: 'close to upper' },
        
    ];

    const questions = positions.map(pos => ({
        value: pos.value,
        positionType: pos.type,
        cursorPosition: `${pos.position}%`
    }));

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [randomizedQuestions, setRandomizedQuestions] = useState([]);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [lastDigitAttempts, setLastDigitAttempts] = useState(0); 

    useEffect(() => {
        const shuffleQuestions = () => {
            let shuffled = [...questions];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        setRandomizedQuestions(shuffleQuestions());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestionIndex]);

    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
    };

    const validateAnswer = () => {
        const correctAnswer = parseFloat(randomizedQuestions[currentQuestionIndex].value);
        const userAnswerNum = parseFloat(userAnswer);
        const positionType = randomizedQuestions[currentQuestionIndex].positionType;
    
        const validFormat = /^\d\.\d$/.test(userAnswer);
        if (!validFormat) {
            setFeedback("Be sure to use the correct amount of digits: #.#");
            setFeedbackClass('incorrect');
            return;
        }
    
        const [correctWhole, correctDecimal] = randomizedQuestions[currentQuestionIndex].value.split('.');
        const [userWhole, userDecimal] = userAnswer.split('.');
    
        if (userAnswerNum === correctAnswer) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
            setLastDigitAttempts(0); 
            return;
        }
    
        if (Math.abs(userAnswerNum - correctAnswer) <= 0.15) {
            setFeedback("Your answer is valid; however, most chemists agree there is a better answer. Please try again.");
            setFeedbackClass('incorrect');
            setLastDigitAttempts(0); 
            return;
        }
    
        if (userWhole === correctWhole && userDecimal !== correctDecimal) {
            if (lastDigitAttempts < 1) {
                setFeedback("Last digit is not quite right.");
                setLastDigitAttempts(lastDigitAttempts + 1);
            } else {
                if (positionType === 'closer to lower') {
                    setFeedback('For measurements closer to the lower tick, the last digit should be between 1 and 4.');
                } else if (positionType === 'closer to upper') {
                    setFeedback('For measurements closer to the upper tick, the last digit should be between 6 and 9.');
                } else if (positionType === 'on tick') {
                    setFeedback('For on-tick measurements, the last digit should be 0.');
                }
            }
            setFeedbackClass('incorrect');
            return;
        }
        setFeedback("The answer is incorrect. Please check your answer and try again.");
        setFeedbackClass('incorrect');
        setLastDigitAttempts(0); 
    };

    const handleSubmitAnswer = () => {
        validateAnswer();
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswer('');
            setFeedback('');
            setFeedbackClass('hidden');
            setIsAnswerCorrect(false);
        }
    };

    return (
        <div className='lesson-one-point-eight'>
            <div className='questionheader'>
                <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
                <img src={require('../../assets/question/Home.png')} className='homelines' onClick={handlequestion} alt="Home Lines" />
                <div className='insideheader'><h1>ChemClicks Assignments</h1></div>
            </div>
            <div className='lesson-one-point-eight-box'>
                <div className='lesson-one-point-eight-box-title'>
                    <h1>Unit One: Uncertainty in Measurement - Tenths Value</h1>
                </div>
                <div className='lesson-one-point-eight-content'>
                    <p className='lesson-one-point-eight-prompt'>
                        Look at the graduted cylinder and enter the measurement you think the meniscus is at. <br />
                        Hint: Make sure to measure from the bottom of the meniscus!
                    </p>
                    <div className="lesson-one-point-eight-cylinder-container">
                        <div className="lesson-one-point-eight-cylinderWaterContainer">
                            <img src={require('../../assets/question/gradCylinder.png')} className="lesson-one-point-eight-cylinder" alt="Graduated Cylinder" />
                            <div className="lesson-one-point-eight-cylinderWater" style={{ top: randomizedQuestions[currentQuestionIndex]?.cursorPosition }}></div>
                        </div>
                    </div>

                    <hr className="separator" />
                    <div className='lesson-one-point-eight-question'>
                        <h1>Enter the measurement shown:</h1>
                        <input 
                            type='text' 
                            className='lesson-one-point-eight-input' 
                            placeholder='Enter the measurement here' 
                            value={userAnswer}
                            onChange={handleInputChange} 
                        /> 
                    </div>
                </div>

                <div className="submit-feedback-container">
                    {!isAnswerCorrect && (
                        <button className='lesson-one-point-eight-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                    )}
                    {isAnswerCorrect && (
                        <button className='lesson-one-point-eight-next' onClick={handleNextQuestion}>Next Question</button>
                    )}
                    <span className={`lesson-one-point-eight-feedback ${feedbackClass}`}>{feedback}</span>
                </div>
            </div>

            {/* Consistent for Each Question Page */}
            <div className='masterybox'>
                <div className='masteryboxtitle'><h1>Mastery</h1></div>
                <div className='masteryboxstars'>
                    <img src={require('../../assets/question/Stars.png')} className='masterystars' alt="Mastery Stars"/>
                </div>
            </div>
            <div className='goalbox'>
                <div className='goalboxtitle'><h1>Goal</h1></div>
                <div className='goalboxchecks'>
                    <img src={require('../../assets/question/Checkmarks.png')} className='goalchecks' alt="Goal Checks"/>
                </div>
            </div>
            <div className='progressbox'>
                <div className='progressboxtitle'><h1>Progress</h1>
                    <h2>Current Topic Progress: 33%</h2>
                </div>
                <div className='progressboxbar'>
                    <img src={require('../../assets/question/ProgressBar.jpg')} className='progressbar' alt="Progress Bar" />
                </div>
            </div>
        </div>
    );
}

export default LessonOnePointEight;
