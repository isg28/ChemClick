import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonTwoPointFive.css';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from './LessonUtils';

function LessonTwoPointFive() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;     
    const lessonId = 'lesson2.5'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);    const displayMedals = starsEarned >= 5;

    const [randomNumber, setRandomNumber] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const generateRandNum = () => {
        const x = (Math.random().toFixed(1)); // 50/50 chance the reading on the scale will pass
        if (x <= 0.5){
            setRandomNumber((Math.random() * 0.09 + 200).toFixed(2));
        } else {
            setRandomNumber((Math.random() * 0.99 + 200).toFixed(2));
        }
    }

    const getTenthsPlace = (num) => {
        return Math.floor((num * 10) % 10);
    }

    useEffect(() => {
        if (!userId) { 
          console.error('ID not found');
          navigate('/login');
          return;
        }

        const initializeData = async () => {
            await fetchLessonData(lessonId, setGoal);
            await fetchLessonProgress(userId, lessonId, isTeacher, {
                setCorrectAnswers,
                setIncorrectAnswers,
                setProgress,
                setMasteryLevel,
                setGoal,
                setTotalAttempts,
            });        
        };
        
        initializeData();

        generateRandNum();
    }, [userId, lessonId, navigate, isTeacher]);

    useEffect(() => {
        if (progress === 100) {
            setShowCompletionModal(true);
        }
    }, [progress]);

    const validateAnswer = async () => {
        const correctAnswer = randomNumber;
    
        if ((getTenthsPlace(correctAnswer) === 0 && selectedOption === 'Yes') || (getTenthsPlace(correctAnswer) !== 0 && selectedOption === 'No')) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
            await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
            return;
        } else {
            setFeedback("For this reading to pass, the screen must display 200.0#.");
            setFeedbackClass('incorrect');
            await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
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
        <div className='lesson-two-point-five'>

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
                <div className='lesson-two-point-five-box'>
                    <div className='lesson-two-point-five-box-innercont'>
                        <div className='lesson-two-point-five-box-title'>
                            <h1>Unit Two: Reading a Standard (###.##)</h1>
                        </div>
                        <div className='lesson-two-point-five-content'>
                            <p className='lesson-two-point-five-prompt'>
                                Place the standard 200g object on the scale and determine whether the reading passes.
                                <br /> Hint: the scale measures up to the hundredths place!
                            </p>
                            <div className="lesson-two-point-five-container">
                                <div className="lesson-two-point-five-reading-container">
                                    <img src={require('../../assets/question/scale.png')} className="lesson-two-point-five-scale" alt="Scale" />
                                    <img src={require('../../assets/question/bear.png')} className="lesson-two-point-five-bear" alt="Teddy Bear" />
                                    <h3 className="lesson-two-point-five-scale-reading">{randomNumber}</h3>
                                </div>
                            </div>

                                <hr className="separator" />
                                <div className='lesson-two-point-five-question'>
                                    <h1>Does the reading on the scale pass?</h1>
                                    <br />
                                    <label className='lesson-two-point-five-answer1'>
                                        <input type="radio" value="Yes" checked={selectedOption === 'Yes'} onChange={handleOptionChange} />
                                        Yes
                                    </label>
                                    <br />
                                    <label className='lesson-two-point-five-answer2'>
                                        <input type="radio" value="No" checked={selectedOption === 'No'} onChange={handleOptionChange} />
                                        No
                                    </label>
                                </div>
                            
                        <span className={`lesson-two-point-five-feedback ${feedbackClass}`}>{feedback}</span>
                        <div className="submit-feedback-container">
                            {!isAnswerCorrect && (
                                <button className='lesson-two-point-five-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                            )}
                            {isAnswerCorrect && (
                                <button className='lesson-two-point-five-next' onClick={handleNextQuestion}>Next Question</button>
                            )}
                            </div>
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
                    </div>
                    {/* Next Lesson button positioned below the Goals box */}
                    <div className="next-lesson-button-container" style={{ marginTop: '20px' }}>
                        <button 
                            className="next-lesson-button" 
                            onClick={() => navigate('/lessontwopointsix')}
                            style={{ 
                                padding: '20px 40px', 
                                fontSize: '20px', 
                                border: '5px solid #006400', 
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            Next Lesson
                        </button>
                    </div>
                </div>
            </div>
            {showCompletionModal && (
                <div className="completion-modal">
                    <div className="completion-modal-content">
                        <h2>🎉 Congratulations! 🎉</h2>
                        <p>You've finished the assignment! Keep practicing to strengthen your skills.</p>
                        <button onClick={() => setShowCompletionModal(false)}>Continue</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LessonTwoPointFive;
