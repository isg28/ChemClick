import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonTwoPointSix.css';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from './LessonUtils';

function LessonTwoPointSix() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson2.6'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const { starsEarned, stars } = renderStars(masteryLevel);
    const displayMedals = starsEarned >= 5;

    const [randomNumber, setRandomNumber] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const generateRandNum = () => {
        const randomNum = (Math.random() * 0.99 + 5).toFixed(3);
        setRandomNumber(randomNum);
    }

    const getHundredthsPlace = (num) => {
        return Math.floor((num * 100) % 100);
    }

    useEffect(() => {
        if (!studentId) {
            console.error('Student ID not found');
            navigate('/login'); // Redirect to login if studentId is missing
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

        generateRandNum();
    }, [studentId, lessonId, navigate]);

    const validateAnswer = async () => {
        const correctAnswer = randomNumber;
    
        if ((getHundredthsPlace(correctAnswer) === 0 && selectedOption === 'Yes') || (getHundredthsPlace(correctAnswer) !== 0 && selectedOption === 'No')) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
            await CorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal,starsEarned,
                setCorrectAnswers, setProgress, setMasteryLevel,
            }); 
            return;
        } else {
            setFeedback("For this reading to pass, the screen must display 5.00#.");
            setFeedbackClass('incorrect');
            await IncorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal, starsEarned,
                setCorrectAnswers, setProgress, setMasteryLevel,
            });

            setTimeout(() => {
                setFeedback('');
                setFeedbackClass('');
            }, 2500);
            return;
        }
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmitAnswer = () => {
        validateAnswer();
    };

    const handleNextQuestion = () => {
        generateRandNum();
        setFeedback('');
        setFeedbackClass('hidden');
        setIsAnswerCorrect(false);
        setSelectedOption('');
    };

    return (
        <div className='lesson-two-point-six'>

            <div className='questionheader'>
                <div className="question-head-in">
                    <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
                    <div className='insideheader'>
                        <h1>ChemClicks Assignments</h1>
                    </div>
                    <img src={require('../../assets/question/Home.png')} className='homelines' onClick={handlequestion} alt="Home Lines" />
                </div>
            </div>

            <div className="question-page-main">
                <div className='lesson-two-point-six-box'>
                    <div className='lesson-two-point-six-box-innercont'>
                        <div className='lesson-two-point-six-box-title'>
                            <h1>Unit Two: Reading a Standard (#.###)</h1>
                        </div>
                        <div className='lesson-two-point-six-content'>
                            <p className='lesson-two-point-six-prompt'>
                                Place the standard 5g object on the scale and determine whether the reading passes.
                                <br /> Hint: the scale measures up to the thousandths place!
                            </p>
                            <div className="lesson-two-point-six-container">
                                <div className="lesson-two-point-six-reading-container">
                                    <img src={require('../../assets/question/scale.png')} className="lesson-two-point-six-scale" alt="Scale" />
                                    <img src={require('../../assets/question/frog.png')} className="lesson-two-point-six-frog" alt="Frog" />
                                    <h3 className="lesson-two-point-six-scale-reading">{randomNumber}</h3>
                                </div>
                            </div>

                                <hr className="separator" />
                                <div className='lesson-two-point-six-question'>
                                    <h1>Does the reading on the scale pass?</h1>
                                    <br />
                                    <label className='lesson-two-point-six-answer1'>
                                        <input type="radio" value="Yes" checked={selectedOption === 'Yes'} onChange={handleOptionChange} />
                                        Yes
                                    </label>
                                    <br />
                                    <label className='lesson-two-point-six-answer2'>
                                        <input type="radio" value="No" checked={selectedOption === 'No'} onChange={handleOptionChange} />
                                        No
                                    </label>
                                </div>
                            </div>

                        <div className="submit-feedback-container">
                            {!isAnswerCorrect && (
                                <button className='lesson-two-point-six-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                            )}
                            {isAnswerCorrect && (
                                <button className='lesson-two-point-six-next' onClick={handleNextQuestion}>Next Question</button>
                            )}
                            <span className={`lesson-two-point-six-feedback ${feedbackClass}`}>{feedback}</span>
                        </div>
                    </div>
                </div> 

                {/* Consistent for Each Question Page */}
                <div className="side-column">
                <div className="side-column-box-holder">
                    <div className="side-column-box masterybox">
                        <div className="side-column-box-title masteryboxtitle"> <h1>Mastery</h1> </div>
                        {displayMedals && (
                            <>
                            <div className='reward-box-left' title="Congrats on achieving mastery! Feel free to keep practicing!">
                                🏅 
                            </div>
                            <div className='reward-box-right' title="Congrats on achieving mastery! Feel free to keep practicing!">
                                🏅 
                            </div>
                        </>
                        )}
                        <div className="side-column-box-info masteryboxstars">{stars}</div>
                    </div>
                        <div className='side-column-box'>
                            <div className='side-column-box-title'><h1>Goal</h1></div>
                            <div className='side-column-box-info'>
                                {renderGoalChecks(goal, correctAnswers)}
                            </div>
                        </div>
                        <div className='side-column-box'>
                            <div className='side-column-box-title'><h1>Progress</h1></div>
                            <div className='side-column-box-info'>              
                                <div className="progressbox">
                                    <div
                                        className="progressbar"
                                        style={{ '--progress': progress }}
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

export default LessonTwoPointSix;
