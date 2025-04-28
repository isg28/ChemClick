import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonEightPointOne.css';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from './LessonUtils';

function LessonEightPointFour() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId; 
    const lessonId = 'lesson8.4'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);    
    const displayMedals = starsEarned >= 5;

    const [userInput, setUserInput] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [randomizedQuestions, setRandomizedQuestions] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const ions = [
        { symbol: "H¹⁺", name: "hydrogen ion", category: "positive", input: "H1+" },
        { symbol: "Li¹⁺", name: "lithium ion", category: "positive", input: "Li1+" },
        { symbol: "Na¹⁺", name: "sodium ion", category: "positive", input: "Na1+" },
        { symbol: "K¹⁺", name: "potassium ion", category: "positive", input: "K1+" },
        { symbol: "Rb¹⁺", name: "rubidium ion", category: "positive", input: "Rb1+" },
        { symbol: "Cs¹⁺", name: "cesium ion", category: "positive", input: "Cs1+" },
        { symbol: "Ag¹⁺", name: "silver ion", category: "positive", input: "Ag1+" },
        { symbol: "Be²⁺", name: "beryllium ion", category: "positive2", input: "Be2+" },
        { symbol: "Mg²⁺", name: "magnesium ion", category: "positive2", input: "Mg2+" },
        { symbol: "Sr²⁺", name: "strontium ion", category: "positive2", input: "Sr2+" },
        { symbol: "Ba²⁺", name: "barium ion", category: "positive2", input: "Ba2+" },
        { symbol: "Ra²⁺", name: "radium ion", category: "positive2", input: "Ra2+" },
        { symbol: "Zn²⁺", name: "zinc ion", category: "positive2", input: "Zn2+" },
        { symbol: "Ca²⁺", name: "calcium ion", category: "positive2", input: "Ca2+" },
        { symbol: "Al³⁺", name: "aluminum ion", category: "positive3", input: "Al3+" },
        { symbol: "H¹⁻", name: "hydride ion", category: "negative", input: "H1-" },
        { symbol: "F¹⁻", name: "fluoride ion", category: "negative", input: "F1-" },
        { symbol: "Cl¹⁻", name: "chloride ion", category: "negative", input: "Cl1-" },
        { symbol: "Br¹⁻", name: "bromide ion", category: "negative", input: "Br1-" },
        { symbol: "I¹⁻", name: "iodide ion", category: "negative", input: "I1-" },
        { symbol: "O²⁻", name: "oxide ion", category: "negative2", input: "O2-" },
        { symbol: "S²⁻", name: "sulfide ion", category: "negative2", input: "S2-" },
        { symbol: "Se²⁻", name: "selenide ion", category: "negative2", input: "Se2-" },
        { symbol: "Te²⁻", name: "telluride ion", category: "negative2", input: "Te2-" },
        { symbol: "N³⁻", name: "nitride ion", category: "negative3", input: "N3-" },
        { symbol: "P³⁻", name: "phosphide ion", category: "negative3", input: "P3-" },
        { symbol: "As³⁻", name: "arsenide ion", category: "negative3", input: "As3-" },
    ];

    const questions = ions.flatMap(ion => [   
        {
            type: 'symbol', // Prompt for the symbol given the name
            text: 'What is the symbol for:',
            prompt: ion.name,
            answer: ion.input,
            category: ion.category,
        },
        {
            type: 'name', // Prompt for the name given the symbol
            text: 'What is the name for:',
            prompt: ion.symbol,
            answer: ion.name,
            category: ion.category,
        }
    ]);

    const shuffleQuestions = () => {
        let shuffled = [...questions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

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
        if (questions.length > 0){ 
            setRandomizedQuestions(shuffleQuestions());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestionIndex, userId, lessonId, navigate, isTeacher]);

    useEffect(() => {
        if (progress === 100) {
            setShowCompletionModal(true);
        }
    }, [progress]);

    const validateAnswer = async () => {
        const currentQuestion = randomizedQuestions[currentQuestionIndex];
        const correctAnswer = currentQuestion.answer;
    
        if (userInput.trim() === correctAnswer) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
            await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
            return;
        } else {
            if(currentQuestion.type === 'name'){
                if(currentQuestion.category === 'positive'){
                    setFeedback("Not quite right, remember cations end with an 'ion' in the name!");
                } else {    // then it's negative
                    setFeedback("Not quite right, remember negatively charged ions end in -ide!");
                }
            } else {    // then it's a symbol question
                if(currentQuestion.category === 'positive'){
                    setFeedback("Not quite right, remember cations are positively charged!");
                } else if (currentQuestion.category === 'positive2' || currentQuestion.category === 'positive3'){
                    setFeedback("Make sure to check the positive charge!");
                } else if (currentQuestion.category === 'negative') {
                    setFeedback("Not quite right, remember monatmomic ions ending in -ide are negatively charged!");
                } else {    // then it's a 2- or 3- anion
                    setFeedback("Make sure to check the negative charge!");
                }
            }
            setFeedbackClass('incorrect');
            await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });

            setTimeout(() => {
                setFeedback('');
                setFeedbackClass('');
            }, 3000);
            return;
        }
    };


    const handleSubmitAnswer = () => {
        if(isAnswerCorrect){     // prevents user from pressing enter multiple times
            return;
        }
        validateAnswer();
    };

    const handleNextQuestion = () => {
        if (randomizedQuestions.length > 0 && currentQuestionIndex < randomizedQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCurrentQuestionIndex(0); // Reset to the first question
        }
        setFeedback('');
        setUserInput('');
        setFeedbackClass('hidden');
        setIsAnswerCorrect(false);
    };

    return (
        <div className='lesson-eight-point-one'>

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
                <div className='lesson-eight-point-one-box'>
                    <div className='lesson-eight-point-one-box-innercont'>
                        <div className='lesson-eight-point-one-box-title'>
                            <h1>Unit Eight: Mixed Practice (Positive & Negative)</h1>
                        </div>
                        <div className='lesson-eight-point-one-content'>
                            <p className='lesson-eight-point-one-prompt'>
                                Given the {randomizedQuestions[currentQuestionIndex]?.type === 'symbol'
                                            ? 'name of a monatomic ion, provide its symbol.'
                                            : 'symbol of a monatomic ion, provide its name.'}
                                <br /> Example input: {randomizedQuestions[currentQuestionIndex]?.type === 'symbol'
                                            ? 'Ba²⁺'
                                            : 'hydrogen ion'}
                            </p>
                            <div className="lesson-eight-point-one-container">
                                {randomizedQuestions.length > 0 && randomizedQuestions[currentQuestionIndex] ? (
                                    <p>{randomizedQuestions[currentQuestionIndex].text}</p>
                                ) : (
                                    <p>Loading question...</p>
                                )}
                                <div className="lesson-eight-point-one-question-box">
                                {randomizedQuestions.length > 0 && randomizedQuestions[currentQuestionIndex] ? (
                                    <p>{randomizedQuestions[currentQuestionIndex].prompt}</p>
                                ) : (
                                    <p>...</p>
                                )}
                                </div>
                            </div>

                            <hr className="separator" />
                            <div className='lesson-eight-point-one-question'>
                                <input
                                    type="text"
                                    className = "lesson-eight-point-one-input"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            if(userInput.trim() !== ''){    // prevents user from entering an empty input
                                                handleSubmitAnswer();
                                            }
                                        }
                                    }}
                                    placeholder={
                                        randomizedQuestions[currentQuestionIndex]?.type === 'symbol'
                                            ? 'Enter the symbol'
                                            : 'Enter the name'
                                    }
                                />
                            
                                {!isAnswerCorrect && (
                                    <button className='lesson-eight-point-one-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                                )}
                                {isAnswerCorrect && (
                                    <button className='lesson-eight-point-one-next' onClick={handleNextQuestion}>Next Question</button>
                                )}
                                
                            </div>
                            <div className="submit-feedback-container">
                                <span className={`lesson-eight-point-one-feedback ${feedbackClass}`}>{feedback}</span>
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
                            onClick={() => navigate('/lessonninepointone')}
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

export default LessonEightPointFour;
