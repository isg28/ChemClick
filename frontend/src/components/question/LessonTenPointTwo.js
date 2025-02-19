import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonTenPointTwo.css';
import { useNavigate } from 'react-router-dom';
//
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

function LessonTenPointTwo(){
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson10.2'; 
    
    const [goal, setGoal] = useState(); //
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
    const displayMedals = starsEarned >= 5; // ^

    const negativePolyatomicIons = useMemo(() => [
        { name: "Hydroxide", symbol: "OH⁻" },
        { name: "Nitrate", symbol: "NO₃⁻" },
        { name: "Nitrite", symbol: "NO₂⁻" },
        { name: "Sulfate", symbol: "SO₄²⁻" },
        { name: "Sulfite", symbol: "SO₃²⁻" },
        { name: "Phosphate", symbol: "PO₄³⁻" },
        { name: "Phosphite", symbol: "PO₃³⁻" },
        { name: "Carbonate", symbol: "CO₃²⁻" },
        { name: "Bicarbonate", symbol: "HCO₃⁻" },
        { name: "Chlorate", symbol: "ClO₃⁻" },
        { name: "Chlorite", symbol: "ClO₂⁻" },
        { name: "Perchlorate", symbol: "ClO₄⁻" },
        { name: "Hypochlorite", symbol: "ClO⁻" },
        { name: "Cyanide", symbol: "CN⁻" },
        { name: "Acetate", symbol: "C₂H₃O₂⁻" },
        { name: "Permanganate", symbol: "MnO₄⁻" },
        { name: "Dichromate", symbol: "Cr₂O₇²⁻" },
        { name: "Chromate", symbol: "CrO₄²⁻" },
        { name: "Fluorate", symbol: "FO₃⁻" }, 
        { name: "Bromate", symbol: "BrO₃⁻" }, 
        { name: "Iodate", symbol: "IO₃⁻" } 
    ], []);

    const getNextIon = useCallback(() => {
        const randomIon = negativePolyatomicIons[Math.floor(Math.random() * negativePolyatomicIons.length)];
        setCurrentIon(randomIon);
        setUserInput('');
        setFeedback('');
        setShowHint(false);
        setQuestionType(Math.random() < 0.5 ? "symbol" : "name");
    }, [negativePolyatomicIons]);

    const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [feedbackClass, setFeedbackClass] = useState('');
    const [currentIon, setCurrentIon] = useState({});
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [letterIndex, setLetterIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState(''); 
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [showTooltip, setShowTooltip] = useState(false);
    const [isUpperCase, setIsUpperCase] = useState(true); 
    const [questionType, setQuestionType] = useState("symbol");
    let errorTimeout = null;

    const toggleCase = () => {
        setIsUpperCase((prev) => !prev);
    };

    useEffect(() => {
        getNextIon();
    }, [getNextIon]);

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
                setIncorrectAnswers,
                setProgress,
                setMasteryLevel,
                setGoal,
                setTotalAttempts,
            });        
        };
    
        initializeData();
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [studentId, lessonId, navigate]);

    useEffect(() => {
        if (progress === 100) {
            setShowCompletionModal(true);
        }
    }, [progress]);

    const handleSubmitAnswer = async () => {
        setErrorMessage(''); 
        setShowTooltip(false); 
    
        let normalizedUserInput = userInput.trim().normalize("NFC");
        let normalizedCorrectAnswer;
    
        if (questionType === "symbol") {
            normalizedCorrectAnswer = currentIon.symbol.normalize("NFC"); 
        } else {
            normalizedCorrectAnswer = currentIon.name.toLowerCase().trim().normalize("NFC"); 
            normalizedUserInput = normalizedUserInput.toLowerCase(); 
        }
    
        let isCorrect = normalizedUserInput === normalizedCorrectAnswer;
        if (isCorrect) {
            setIsAnswerCorrect(true);
            setFeedback("✅ Correct! Well done!");
            setFeedbackClass("correct-feedback");
            await CorrectResponses({studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                                    setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
            setShowHint(false);
        } else {
            setIsAnswerCorrect(false);
            setFeedback(`❌ Incorrect. ${questionType === "symbol" ? "Make sure to enter the correct ion symbol" : "Make sure to enter the correct ion name."}`);
            setFeedbackClass("incorrect-feedback");
            await IncorrectResponses({studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned,
                                    setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });
    
            if (questionType === "symbol") {
                setShowHint(true);
            } else {
                setShowHint(false); 
            }
        }
    };
    
    const handleNextQuestion = () => {
        setIsAnswerCorrect(false);
        setFeedback('');
        setFeedbackClass('');
        setUserInput('');
        setShowHint(false); 
        getNextIon();
    };

    const handleErase = () => {
        setUserInput('');
        setFeedback('');
    };

    // Insert Subscript or Ion when a Button is Clicked
    const insertSymbol = (symbol) => {
        setUserInput((prev) => prev + symbol);
        setErrorMessage(''); 
        setShowTooltip(false); 
    };

    const scrollLetters = (direction) => {
        setErrorMessage(''); 
        setShowTooltip(false); 
        if (direction === "left" && letterIndex > 0) {
            setLetterIndex(letterIndex - 5);
        } else if (direction === "right" && letterIndex < capitalLetters.length - 5) {
            setLetterIndex(letterIndex + 5);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key !== 'Backspace') {
            event.preventDefault();
            setErrorMessage('Use the buttons below!');
            setShowTooltip(true);

            if (errorTimeout) clearTimeout(errorTimeout);
            errorTimeout = setTimeout(() => {
                setShowTooltip(false);
            }, 3000);
        } else {
            setErrorMessage('');
        }
    };

    const handlePaste = (event) => {
        event.preventDefault();
        setErrorMessage('Pasting is not allowed!');
        setShowTooltip(true);

        if (errorTimeout) clearTimeout(errorTimeout);
        errorTimeout = setTimeout(() => {
            setShowTooltip(false);
        }, 3000);
    };

    const handleMouseMove = (event) => {
        setTooltipPosition({ x: event.clientX + 10, y: event.clientY + 10 });
    };

    // Increase input box size
    const inputStyles = {
        width: '300px', 
        height: '50px', 
        fontSize: '1.5rem', 
        textAlign: 'center'
    };

    return (
        <div className='lesson-ten-point-two'>
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
                <div className='lesson-ten-point-two-box'>
                <div className='lesson-ten-point-two-box-innercont'>
                    <div className='lesson-ten-point-two-box-title'>
                        <h1>Unit Ten: Ionic Compounds (Polyatomic Ions)</h1>
                        {/*    <h1>{`${lessonName}`}</h1> {/* ASK IF PREFERED OR NOT  */}

                    </div>
                    <div className='lesson-ten-point-two-content'>

                        <div className="quiz-container">
                        <h2>
                            {questionType === "symbol" 
                                ? `Write the symbol for: ` 
                                : `Write the name for: `}
                            <strong>{questionType === "symbol" ? currentIon.name : currentIon.symbol}</strong>
                        </h2>

                            <div className="input-section">
                                <div className="input-container">
                                    <input
                                        type="text"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)} 
                                        onKeyDown={(event) => questionType === "symbol" && handleKeyDown(event)} // Prevent typing for "symbol" questions
                                        onPaste={(event) => questionType === "symbol" && handlePaste(event)}
                                        placeholder={questionType === "symbol" ? "Click the buttons below..." : "Type your answer here..."}
                                        readOnly={questionType === "symbol"} 
                                        style={inputStyles}
                                        onMouseMove={handleMouseMove}
                                    />
                                    
                                    {questionType === "symbol" && (
                                        <button className="lesson-ten-point-two-delete-button" onClick={handleErase}>🗑️</button>
                                    )}
                                </div>

                                {showTooltip && (
                                    <div 
                                        className="floating-tooltip" 
                                        style={{ top: tooltipPosition.y, left: tooltipPosition.x }}
                                    >
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                            <div className="separator"></div>

                            {questionType === "symbol" && (
                                <>
                                    <div className="symbol-row">
                                        <div className="letter-row-container">
                                            <p>Letters:</p>
                                            <button className="arrow-button" onClick={() => scrollLetters("left")}>⬅</button>
                                            <div className="letter-buttons-container">
                                                {capitalLetters.slice(letterIndex, letterIndex + 5).map((letter, index) => (
                                                    <button key={index} className="letter-button" onClick={() => insertSymbol(isUpperCase ? letter : letter.toLowerCase())}>
                                                        {isUpperCase ? letter : letter.toLowerCase()}
                                                    </button>
                                                ))}
                                            </div>
                                            <button className="arrow-button" onClick={() => scrollLetters("right")}>➡</button>
                                        </div>

                                        <div className="lesson-ten-point-two-separator"></div>

                                        <button className="case-toggle-button" onClick={toggleCase}>
                                            {isUpperCase ? "A → a" : "a → A"}
                                        </button>
                                    </div>

                                    {/* Subscripts, Exponents, and Charges Row */}
                                    <div className="symbol-buttons-container">
                                        <div className="symbol-row">
                                            <p>Subscripts:</p>
                                            <button onClick={() => insertSymbol("₁")}>₁</button>
                                            <button onClick={() => insertSymbol("₂")}>₂</button>
                                            <button onClick={() => insertSymbol("₃")}>₃</button>
                                            <button onClick={() => insertSymbol("₄")}>₄</button>
                                            <button onClick={() => insertSymbol("₅")}>₅</button>
                                        </div>
                                        <div className="symbol-row">
                                            <p>Exponents:</p>
                                            <button onClick={() => insertSymbol("¹")}>¹</button>
                                            <button onClick={() => insertSymbol("²")}>²</button>
                                            <button onClick={() => insertSymbol("³")}>³</button>
                                            <button onClick={() => insertSymbol("⁴")}>⁴</button>
                                        </div>
                                        <div className="symbol-row">
                                            <p>Ion Charges:</p>
                                            <button onClick={() => insertSymbol("⁺")}>⁺</button>
                                            <button onClick={() => insertSymbol("⁻")}>⁻</button>
                                        </div>
                                    </div>
                                </>
                            )}
                
                        </div>

                        <div className="submit-feedback-container">
                            {!isAnswerCorrect && (
                                <button className='lesson-one-point-two-submit' onClick={handleSubmitAnswer}>
                                    Submit Answer
                                </button>
                            )}
                            {isAnswerCorrect && (
                                <button className='lesson-one-point-two-next' onClick={handleNextQuestion}>
                                    Next Question
                                </button>
                            )}
                            <span className={`lesson-one-point-two-feedback ${feedbackClass}`}>{feedback}</span>
                        </div>
                        {!isAnswerCorrect && showHint && questionType === "symbol" && (
                            <p className="hint">
                                Hint: {currentIon.symbol.replace(/[A-Za-z]/g, '_')}
                            </p>
                        )}




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

export default LessonTenPointTwo;