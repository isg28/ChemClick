import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    renderStars,
    renderGoalChecks,
    fetchLessonData,
    fetchLessonProgress,
    CorrectResponses,
    IncorrectResponses,
} from "./LessonUtils";

import "../../styles/question/Question.css";
import "../../styles/question/LessonElevenPointThree.css";

function LessonElevenPointThree() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;     
    const lessonId = "lesson11.3";

    const [goal, setGoal] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0);
    const [masteryLevel, setMasteryLevel] = useState(0);

    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
    const displayMedals = starsEarned >= 5;

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showNucleusFeedback, setShowNucleusFeedback] = useState(false);
    const nucleusFeedbackMessage = useState("A monatomic ion is created by adding or removing only valence electrons.");

    const MAX_DOTS_PER_SIDE = 6;
    const [randomNumPairs, setRandomNumPairs] = useState(0);
    const [numPairs, setNumPairs] = useState(0);

    // State to control the appearance of the special symbol
    const [showSpecialDot, setShowSpecialDot] = useState(false);
    const [randomNumber, setRandomNumber] = useState(0);
    const [elementNumberChosen, setElementNumberChosen] = useState(0);
    const [showMinusDot, setShowMinusDot] = useState(false);
    const [showEqualDot, setShowEqualDot] = useState(false);
    const [lineToggle, setLineToggle] = useState(0);
    const [answerChoice, setAnswerChoice] = useState(0);

    // Function to toggle ☰ symbol
    const handleShowSpecialDot = () => {
        if (lineToggle === 0) {
            setShowSpecialDot(true);
            setShowMinusDot(false);
            setShowEqualDot(false);
            setNumPairs(0);
            setLineToggle(1);
            setAnswerChoice(3);
        } else {
            setShowSpecialDot(false);
            setShowMinusDot(false);
            setShowEqualDot(false);
            setNumPairs(randomNumPairs);
            setLineToggle(0);
            setAnswerChoice(0);
        }
    };

    // Function to toggle - symbol
    const handleShowMinusDot = () => {
        if (lineToggle === 0) {
            setShowMinusDot(true);
            setShowSpecialDot(false);
            setShowEqualDot(false);
            setNumPairs(0);
            setLineToggle(1);
            setAnswerChoice(1);
        } else {
            setShowMinusDot(false);
            setShowSpecialDot(false);
            setShowEqualDot(false);
            setNumPairs(randomNumPairs);
            setLineToggle(0);
            setAnswerChoice(0);
        }
    };

    // Function to toggle = symbol
    const handleShowEqualDot = () => {
        if (lineToggle === 0) {
            setShowEqualDot(true);
            setShowSpecialDot(false);
            setShowMinusDot(false);
            setNumPairs(0);
            setLineToggle(1);
            setAnswerChoice(2);
        } else {
            setShowEqualDot(false);
            setShowSpecialDot(false);
            setShowMinusDot(false);
            setNumPairs(randomNumPairs);
            setLineToggle(0);
            setAnswerChoice(0);
        }
    };

    const [dotsOne, setDotsOne] = useState({ top: 2, bottom: 2, left: 2 });
    const [dotsTwo, setDotsTwo] = useState({ top: 2, right: 2, bottom: 2,});


    //const [answerValue, setAnswerValue] = useState(0);


    const names = [
        // { value: "1", nameOne: 'H', nameTwo: 'H'},
        // { value: "2", nameOne: 'O', nameTwo: 'O'},
        // { value: "2", nameOne: 'N', nameTwo: 'N'},
        // { value: "2", nameOne: 'F', nameTwo: 'F'},
        // { value: "2", nameOne: 'Cl', nameTwo: 'Cl'},
        // { value: "2", nameOne: 'H', nameTwo: 'F'},

        { valueOneTop: 0, valueOneBottom: 0, valueOneLeft: 0, 
        valueTwoTop: 0, valueTwoRight: 0, valueTwoBottom: 0, valuePair: 1, nameOne: 'H', nameTwo: 'H'},
        { valueOneTop: 2, valueOneBottom: 2, valueOneLeft: 0, 
        valueTwoTop: 2, valueTwoRight: 0, valueTwoBottom: 2, valuePair: 2, nameOne: 'O', nameTwo: 'O'},
        { valueOneTop: 2, valueOneBottom: 0, valueOneLeft: 0, 
        valueTwoTop: 2, valueTwoRight: 0, valueTwoBottom: 0,valuePair: 3, nameOne: 'N', nameTwo: 'N'},
        { valueOneTop: 2, valueOneBottom: 2, valueOneLeft: 2, 
        valueTwoTop: 2, valueTwoRight: 2, valueTwoBottom: 2, valuePair: 1, nameOne: 'F', nameTwo: 'F'},
        { valueOneTop: 2, valueOneBottom: 2, valueOneLeft: 2, 
        valueTwoTop: 2, valueTwoRight: 2, valueTwoBottom: 2,valuePair: 1, nameOne: 'Cl', nameTwo: 'Cl'},
        { valueOneTop: 0, valueOneBottom: 0, valueOneLeft: 0, 
        valueTwoTop: 2, valueTwoRight: 2, valueTwoBottom: 2,valuePair: 1, nameOne: 'H', nameTwo: 'F'},
    ];

    useEffect(() => {
        const number = Math.floor(Math.random() * 6); // Generates a number between 1 and 20
        setRandomNumber(number);
        setRandomNumPairs(names[number].valuePair);
        setNumPairs(names[number].valuePair);
        setDotsOne({
            top: (names[number].valueOneTop),
            bottom: (names[number].valueOneBottom),
            left: (names[number].valueOneLeft)
        });
        setDotsTwo({
            top: (names[number].valueTwoTop),
            right: (names[number].valueTwoRight),
            bottom: (names[number].valueTwoBottom)
        });
    }, []); 

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

    async function handleSubmit() {
        console.log(names[randomNumber].value)

        if (answerChoice == randomNumPairs) {
            setIsCorrect(true);
            await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
            setFeedbackMessage("Correct! Click done to go to the Dashboard.");
        }
        else {
            setIsCorrect(false);
            await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned,
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });
            setFeedbackMessage("Incorrect. Please try again.");
        }
        setIsSubmitted(true);
    }

    function handleDone() {
        navigate("/dashboard");
    }

    function handleButtonClick() {
        if (!isSubmitted) {
            handleSubmit();
        } else {
            if (isCorrect) {
                handleDone();
            } else {
                handleSubmit();
            }
        }
    }

    let buttonText = "Submit Answer";
    if (isSubmitted) {
        if (isCorrect) {
            buttonText = "Done";
        }
    }

    return (
        <div className="LessonElevenPointThree">
            <div className="questionheader">
                <div className="question-head-in">
                    <img
                        src={require("../../assets/question/ChemClickLogo.png")}
                        className="ChemClickLogoHeader"
                        alt="Chem Click Logo"
                    />
                    <div className="insideheader">
                        <h1>ChemClicks Assignments</h1>
                    </div>
                    <img
                        src={require("../../assets/question/Home.png")}
                        className="homelines"
                        onClick={() => navigate("/dashboard")}
                        alt="Home"
                    />
                </div>
            </div>

            <div className="question-page-main">
                <div className="LessonElevenPointThreeBox">
                    <div className="LessonElevenPointThreeBoxInnercont">
                        <div className="LessonElevenPointThreeBoxTitle">
                            <h1>
                                Unit Eleven: Lewis-Dot Diagram
                            </h1>
                        </div>
                        <div className="LessonElevenPointThreeContent">
                            <p className="LessonElevenPointThreePrompt">
                                Correctly form the Lewis-Dot Structure {names[randomNumber].nameOne}.
                            </p>
                            <div className="LessonElevenPointThreeRow">

                                <div className="LessonElevenPointThreeInput">
                                    <div className="LessonEleven-Lewis-Model-container">
                                    <div className="LessonEleven-Inner-Lewis-Model-container">
                                        <div className="LessonEleven-Holder-LewisModel-Container">
                                            <div className="LessonEleven-Complete-LewisModel-One">
                                                {/* Top Dots */}
                                                <div className="Lewis-Dot-dots">{'• '.repeat(dotsOne.top)}</div>

                                                {/* Structure: Left dots, Atom, Right dots */}
                                                <div className="Lewis-Dot-structure">
                                                    <div className="side-dots-left">
                                                    {Array(dotsOne.left).fill("•").map((dot, index) => (
                                                        <div key={`left-${index}`} className="dot">{dot}</div>
                                                    ))}
                                                    </div>

                                                    <div className="Lewis-Dot-atom">{names[randomNumber].nameOne}</div>

                                                    {/* Right side dots */}
                                                    <div className="side-dots-right">
                                                        {Array(numPairs).fill(null).map((_, index) => (
                                                            <div key={`right-${index}`} className="pair-of-dots">
                                                                <div className="dot">•</div>
                                                                <div className="dot">•</div>
                                                            </div>
                                                        ))}

                                                        {/* Conditionally Render Special Symbols */}
                                                        {showSpecialDot && (
                                                            <div className="pair-of-dots">
                                                                <div className="dot">☰</div>
                                                            </div>
                                                        )}
                                                        {showMinusDot && (
                                                            <div className="pair-of-dots">
                                                                <div className="dot">-</div>
                                                            </div>
                                                        )}
                                                        {showEqualDot && (
                                                            <div className="pair-of-dots">
                                                                <div className="dot">=</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* Bottom Dots */}
                                                <div className="Lewis-Dot-dots">{'• '.repeat(dotsOne.bottom)}</div>
                                            </div>
                                            <div className="LessonEleven-Complete-LewisModel-One">
                                                <div className="Lewis-Dot-dots">{'• '.repeat(dotsTwo.top)}</div>
                                                    <div className="Lewis-Dot-structure">
                                                        <div className="Lewis-Dot-atom">{names[randomNumber].nameTwo}</div>

                                                        <div className="side-dots-left">
                                                        {Array(dotsTwo.right).fill("•").map((dot, index) => (
                                                            <div key={`left-${index}`} className="dot">{dot}</div>
                                                        ))}
                                                        </div>
                                                    </div>
                                                <div className="Lewis-Dot-dots">{'• '.repeat(dotsTwo.bottom)}</div>
                                            </div>
                                        </div>

                                        

                                        {/* Buttons */}
                                        <div className="buttons">
                                            <div className="button-group">
                                                <button onClick={handleShowSpecialDot}>Toggle ☰</button>
                                                <button onClick={handleShowMinusDot}>Toggle -</button>
                                                <button onClick={handleShowEqualDot}>Toggle =</button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showNucleusFeedback && (
                                <div className="LessonElevenPointThreeFeedback image-feedback">
                                    {nucleusFeedbackMessage}
                                </div>
                            )}
                            {feedbackMessage !== "" && (
                                <div
                                    className={
                                        "LessonElevenPointThreeFeedback " +
                                        (isCorrect ? "correct" : "incorrect")
                                    }
                                >
                                    {feedbackMessage}
                                </div>
                            )}
                        </div>
                        <div className="submit-feedback-container">
                            <button
                                className="LessonElevenPointThreeSubmit"
                                onClick={handleButtonClick}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="side-column">
                    <div className="side-column-box-holder">
                        <div className="side-column-box masterybox">
                            <div className="side-column-box-title masteryboxtitle">
                                <h1>Mastery</h1>
                            </div>
                            {displayMedals && (
                                <div>
                                    <div
                                        className="reward-box-left"
                                        title="Congrats on achieving mastery!"
                                    >
                                        🏅
                                    </div>
                                    <div
                                        className="reward-box-right"
                                        title="Congrats on achieving mastery!"
                                    >
                                        🏅
                                    </div>
                                </div>
                            )}
                            <div className="side-column-box-info masteryboxstars">
                                {stars}
                            </div>
                        </div>
                        <div className="side-column-box">
                            <div className="side-column-box-title">
                                <h1>Goal</h1>
                            </div>
                            <div className="side-column-box-info">
                                {renderGoalChecks(goal, correctAnswers)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LessonElevenPointThree;
