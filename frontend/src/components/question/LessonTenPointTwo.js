import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonTenPointTwo.css';
import { useNavigate } from 'react-router-dom';
//
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

function LessonTenPointTwo(){
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;      
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
        { name: "hydroxide ion", symbol: "OH¹⁻" },
        { name: "nitrate ion", symbol: "NO₃¹⁻" },
        { name: "nitrite ion", symbol: "NO₂¹⁻" },
        { name: "sulfate ion", symbol: "SO₄²⁻" },
        { name: "sulfite ion", symbol: "SO₃²⁻" },
        { name: "phosphate ion", symbol: "PO₄³⁻" },
        { name: "phosphite ion", symbol: "PO₃³⁻" },
        { name: "carbonate ion", symbol: "CO₃²⁻" },
        { name: "bicarbonate ion", symbol: "HCO₃¹⁻" },
        { name: "chlorate ion", symbol: "ClO₃¹⁻" },
        { name: "chlorite ion", symbol: "ClO₂¹⁻" },
        { name: "perchlorate ion", symbol: "ClO₄¹⁻" },
        { name: "hypochlorite ion", symbol: "ClO¹⁻" },
        { name: "cyanide ion", symbol: "CN¹⁻" },
        { name: "acetate ion", symbol: "C₂H₃O₂¹⁻" },
        { name: "permanganate ", symbol: "MnO₄¹⁻" },
        { name: "dichromate ion", symbol: "Cr₂O₇²⁻" },
        { name: "chromate ion", symbol: "CrO₄²⁻" },
        { name: "fluorate ion", symbol: "FO₃¹⁻" }, 
        { name: "bromate ion", symbol: "BrO₃¹⁻" }, 
        { name: "iodate ion", symbol: "IO₃¹⁻" } 
    ], []);


    const getNextIon = useCallback(() => {
        const randomIon = negativePolyatomicIons[Math.floor(Math.random() * negativePolyatomicIons.length)];
        setCurrentIon(randomIon);
        setUserInput('');
        setFeedback('');
        setShowHint(false);
        setQuestionType(Math.random() < 0.5 ? "symbol" : "name");
        setInputGroups([{ base: '', subscript: '', charge: '' }]); 
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
    const [baseInput, setBaseInput] = useState('');
    const [subscriptInput, setSubscriptInput] = useState('');
    const [chargeInput, setChargeInput] = useState('');
    const [inputGroups, setInputGroups] = useState([{ base: '', subscript: '', charge: '' }]);
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
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [userId, lessonId, navigate, isTeacher]);

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
            
            if (normalizedUserInput !== normalizedUserInput.toLowerCase()) {
                setFeedback("⚠️ Please enter your answer in lowercase.");
                setFeedbackClass("incorrect-feedback");
                return;
            }
        }
    
        let isCorrect = normalizedUserInput === normalizedCorrectAnswer;
        if (isCorrect) {
            setIsAnswerCorrect(true);
            setFeedback("✅ Correct! Well done!");
            setFeedbackClass("correct-feedback");
            await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
            setShowHint(false);
        } else {
            setIsAnswerCorrect(false);
            setFeedback("❌ Incorrect. Try again!");
            setFeedbackClass("incorrect-feedback");
            await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
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
        setInputGroups([{ base: '', subscript: '', charge: '' }]);
        setFeedback('');
    };

    const insertSymbol = (symbol) => {
        setErrorMessage('');
        setShowTooltip(false);
    
        setInputGroups((prevGroups) => {
            const newGroups = [...prevGroups];
            const lastGroupIndex = newGroups.length - 1;
            const lastGroup = newGroups[lastGroupIndex];
    
            if (/[A-Za-z]/.test(symbol)) {
                if (lastGroup.base.length < 2) {
                    newGroups[lastGroupIndex] = { ...lastGroup, base: lastGroup.base + symbol };
                } else {
                    newGroups.push({ base: symbol, subscript: '', charge: '' });
                }
            } else if (/[₀₁₂₃₄₅₆₇₈₉]/.test(symbol)) {
                if (lastGroup.subscript.length === 0) {
                    newGroups[lastGroupIndex] = { ...lastGroup, subscript: symbol };
                }
            } else if (/[⁺⁻¹²³⁴⁵⁶]/.test(symbol)) {
                if (lastGroup.charge.length === 0) {
                    newGroups[lastGroupIndex] = { ...lastGroup, charge: symbol };
                }
            }
    
            return newGroups;
        });
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

    const combinedInput = inputGroups.map(group => `${group.base}${group.subscript}${group.charge}`).join('');
    useEffect(() => {
        setUserInput(combinedInput); 
    }, [inputGroups]);

    const addInputGroup = () => {
        setInputGroups((prev) => [...prev, { base: '', subscript: '', charge: '' }]);
    };

    const miniBoxStyles = {
        base: {
            width: '30px',
            height: '30px',
            fontSize: '1rem',
            textAlign: 'center',
            margin: '0',
            padding: '0',
            border: '1px solid #ccc',
            borderRadius: '2px 0 0 2px',
        },
        subscript: {
            width: '20px',
            height: '20px',
            fontSize: '0.8rem',
            textAlign: 'center',
            margin: '0',
            padding: '0',
            border: '1px solid #ccc',
            borderLeft: 'none',
            position: 'relative',
            top: '9px',
        },
        charge: {
            width: '20px',
            height: '20px',
            fontSize: '0.8rem',
            textAlign: 'center',
            margin: '0',
            padding: '0',
            border: '1px solid #ccc',
            borderLeft: 'none',
            borderRadius: '0 2px 2px 0',
            position: 'relative',
            top: '-5px',
        },
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
                            <strong>{questionType === "symbol" ? currentIon.name: currentIon.symbol}</strong>
                        </h2>

                        <div className="input-section">
                            <div className="input-container">
                                {questionType === "symbol" ? (
                                    <>
                                    <div className = "mini-boxes-container">
                                    <div className="mini-boxes" style={{ display: 'flex', alignItems: 'center' }}>
                                        {inputGroups.map((group, index) => (
                                            <div key={index} style={{ display: 'inline-flex', marginRight: '5px' }}>
                                                <input
                                                    type="text"
                                                    value={group.base}
                                                    onChange={(e) => {
                                                    const newGroups = [...inputGroups];
                                                    newGroups[index].base = e.target.value.slice(0, 2);
                                                    setInputGroups(newGroups);
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                    onPaste={handlePaste}
                                                    placeholder=""
                                                    readOnly
                                                    style={miniBoxStyles.base}
                                                    onMouseMove={handleMouseMove}
                                                />
                                                <input
                                                    type="text"
                                                    value={group.subscript}
                                                    onChange={(e) => {
                                                    const newGroups = [...inputGroups];
                                                    newGroups[index].subscript = e.target.value.slice(0, 2);
                                                    setInputGroups(newGroups);
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                    onPaste={handlePaste}
                                                    placeholder=""
                                                    readOnly
                                                    style={miniBoxStyles.subscript}
                                                    onMouseMove={handleMouseMove}
                                                />
                                                <input
                                                    type="text"
                                                    value={group.charge}
                                                    onChange={(e) => {
                                                        const newGroups = [...inputGroups];
                                                        newGroups[index].charge = e.target.value.slice(0, 2);
                                                        setInputGroups(newGroups);
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                    onPaste={handlePaste}
                                                    placeholder=""
                                                    readOnly
                                                    style={miniBoxStyles.charge}
                                                    onMouseMove={handleMouseMove}
                                                />
                                            </div>
                                        ))}
                                        </div>
                                        <div className = "lesson-ten-point-two-button-group">
                                            <button
                                                onClick={addInputGroup}
                                                className="add-input-group-button"
                                                title="Click to add another base input."
                                                style={{
                                                    padding: '5px 10px',
                                                    fontSize: '0.9rem',
                                                    cursor: 'pointer',      
                                                }}
                                            >
                                            Add Base
                                            </button>
                                        </div>
                                        <button className="lesson-ten-point-two-delete-button" onClick={handleErase}>🗑️</button>
                                    </div>
                                    </>       
                                ) : (
                                    <input
                                        type="text"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder="Type your answer here..."
                                        style={inputStyles}
                                        onMouseMove={handleMouseMove}
                                    />
                                )}
                            </div>
                            <p className="persistent-hint">
                                {questionType === "symbol" ? (
                                    <>
                                    * Enter the base, subscript, and charge in the corresponding mini boxes.<br />
                                    * Some polyatomic ions may not require all mini boxes.
                                    </>
                                ) : (
                                     <>
                                    * Please enter your answer in lowercase. <br />
                                    * Include the word 'ion' at the end of the polyatomic ion name.<br />
                                    Example: _ ion.
                                    </>
                                )}
                            </p>
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
                                    <p>Ion Charges:</p>
                                    <button onClick={() => insertSymbol("¹⁺")}>¹⁺</button>
                                    <button onClick={() => insertSymbol("²⁺")}>²⁺</button>
                                    <button onClick={() => insertSymbol("³⁺")}>³⁺</button>
                                    <button onClick={() => insertSymbol("⁴⁺")}>⁴⁺</button>
                                    <button onClick={() => insertSymbol("⁵⁺")}>⁵⁺</button>
                                    <button onClick={() => insertSymbol("⁶⁺")}>⁶⁺</button>
                                </div>
                                <div className="symbol-row">
                                    <p>Ion Charges (Negative):</p>
                                    <button onClick={() => insertSymbol("¹⁻")}>¹⁻</button>
                                    <button onClick={() => insertSymbol("²⁻")}>²⁻</button>
                                    <button onClick={() => insertSymbol("³⁻")}>³⁻</button>
                                    <button onClick={() => insertSymbol("⁴⁻")}>⁴⁻</button>
                                    <button onClick={() => insertSymbol("⁵⁻")}>⁵⁻</button>
                                    <button onClick={() => insertSymbol("⁶⁻")}>⁶⁻</button>
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
                            <span className={`lesson-ten-point-two-feedback ${feedbackClass}`}>{feedback}</span>
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