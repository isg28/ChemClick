import React, { useState, useEffect } from "react";
import '../../styles/question/Question.css';
import { useNavigate } from 'react-router-dom';
import '../../styles/question/LessonTwoPointOne.css';
import { renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses } from '../../components/question/LessonUtils';

function LessonTwoPointOne() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson2.1'; 
    
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const { starsEarned, stars } = renderStars(masteryLevel);
    const displayMedals = starsEarned >= 7;

    const [randomWeight, setRandomWeight] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [feedbackClass, setFeedbackClass] = useState("hidden");
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    const handlequestion = () => {
        navigate('/dashboard');
    };

      useEffect(() => {
            if (!studentId) { //
              console.error('Student ID not found');
              navigate('/login');
              return;
            }

             const initializeData = async () => {
                        await fetchLessonData(lessonId, setGoal);
                        await fetchLessonProgress(studentId, lessonId, {
                            setCorrectAnswers,
                            setProgress,
                            setMasteryLevel,
                            setGoal,
                        });        
                    };
                
                    initializeData();
                }, [studentId, lessonId, navigate]);

    // Function to generate a random weight with one decimal place
    const generateNewWeight = () => {
        const newWeight = (Math.random() * (999.9 - 1.0) + 1.0).toFixed(1); // Random weight between 1.0g and 999.9g
        setRandomWeight(newWeight);
        setUserInput("");
        setFeedbackMessage("");
        setFeedbackClass("hidden");
    };

    useEffect(() => {
        generateNewWeight();
    }, []);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = () => {
        const uncertainDigit = randomWeight.slice(-1); // Get the last digit of the displayed weight

        if (userInput === uncertainDigit) {
            setFeedbackMessage("Correct!");
            setFeedbackClass("correct-feedback");
            setCorrectAnswers(correctAnswers + 1);
            setIsAnswerCorrect(true);

            if (correctAnswers + 1 === 7) {
                setFeedbackMessage("Congratulations! You passed.");
            } else {
                setTimeout(generateNewWeight, 1000);
            }
        } else {
            setFeedbackMessage("When using a digital balance, the farthest-right digit displayed is the uncertain digit.");
            setFeedbackClass("error-feedback");
            setCorrectAnswers(0);
            setIsAnswerCorrect(false);
        }
    };

    const handleNextQuestion = () => {
        generateNewWeight();
    };

    return (
        <div className='lesson-two-point-one'>
        <div className='questionheader'>
            <div className="question-head-in">
                <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
                <div className='insideheader'>
                    <h1>ChemClicks Assignments</h1>
                </div>
                <img src={require('../../assets/question/Home.png')} className='homelines' alt="Home" />
            </div>
        </div>

        <div className="question-page-main">
            <div className='lesson-two-point-one-box'>
                <div className='lesson-two-point-one-box-innercont'>
                    <div className='lesson-two-point-one-box-title'>
                        <h1>Unit Two: Uncertainty in Measurement - Digital Scale </h1>
                    </div>
                    <div className="lesson-two-point-one-content">
                        <p className='lesson-two-point-one-prompt'>
                            Observe the digital scale reading and enter the uncertainty value (the tenths place digit).
                        </p>
                        
                        <div className='lesson-two-point-one-scale-container'>
                            <img
                             src={require('../../assets/question/scale.png')} 
                            className="lesson-two-point-one-scale" 
                            alt="Digital Scale" 
                            />
                            <div className='lesson-two-point-one-scale-display'>
                                {randomWeight} g
                            </div>
                        </div>

                         <hr className="separator" />    
                            <div className="lesson-two-point-one-input-container">
                            <h1>Enter the measurement shown:</h1>
                                <input
                                    type="text"
                                    className="lesson-two-point-one-input"
                                    placeholder='Enter the measurement here'
                                    value={userInput}
                                    onChange={handleInputChange}
                                />
                                </div>
                                </div>

                                <div className="submit-feedback-container">
                            {!isAnswerCorrect && (
                                <button className='lesson-two-point-one-submit' onClick={handleSubmit}>Submit Answer</button>
                            )}
                            {isAnswerCorrect && (
                                <button className='lesson-two-point-one-next' onClick={handleNextQuestion}>Next Question</button>
                            )}
                            <span className={`lesson-two-point-one-feedback ${feedbackClass}`}>{feedbackMessage}</span>
                        </div>
                    </div>
                </div>

            {/* Sidebar */}
            <div className="side-column">
                <div className="side-column-box-holder">
                    <div className="side-column-box masterybox">
                        <div className="side-column-box-title masteryboxtitle">
                            <h1>Mastery</h1>
                        </div>
                        {displayMedals && (
                            <>
                                <div
                                    className="reward-box-left"
                                    title="Congrats on achieving mastery! Feel free to keep practicing!"
                                >
                                    🏅
                                </div>
                                <div
                                    className="reward-box-right"
                                    title="Congrats on achieving mastery! Feel free to keep practicing!"
                                >
                                    🏅
                                </div>
                            </>
                        )}
                        <div className="side-column-box-info masteryboxstars">{stars}</div>
                    </div>

                    <div className="side-column-box">
                        <div className="side-column-box-title">
                            <h1>Goal</h1>
                        </div>
                        <div className="side-column-box-info">
                            {renderGoalChecks(goal, correctAnswers)}
                        </div>
                    </div>

                    <div className="side-column-box">
                        <div className="side-column-box-title">
                            <h1>Progress</h1>
                        </div>
                        <div className="side-column-box-info">
                            <div className="progressbox">
                                <div
                                    className="progressbar"
                                    style={{ width: `${progress}%` }}
                                ></div>
                                <div className="progress-text">
                                    Current Topic Progress: {progress.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        
    );
        
}

export default LessonTwoPointOne;