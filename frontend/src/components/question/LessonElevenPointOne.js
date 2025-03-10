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
import "../../styles/question/LessonElevenPointOne.css";

function LessonElevenPointOne() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;     
    const lessonId = "lesson11.1";

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

    const MAX_DOTS_PER_SIDE = 2;

    const images = [
        require("../../assets/question/Hydrogen.png"),
        require("../../assets/question/Helium.png"),
        require("../../assets/question/Lithium.png"),
        require("../../assets/question/Beryllium.png"),
        require("../../assets/question/Boron.png"),
        require("../../assets/question/Carbon.png"),
        require("../../assets/question/Nitrogen.png"),
        require("../../assets/question/Oxygen.png"),
        require("../../assets/question/Fluorine.png"),
        require("../../assets/question/Neon.png"),
        require("../../assets/question/Sodium.png"),
        require("../../assets/question/Magnesium.png"),
        require("../../assets/question/Aluminum.png"),
        require("../../assets/question/Silicon.png"),
        require("../../assets/question/Phosphorous.png"),
        require("../../assets/question/Sulfur.png"),
        require("../../assets/question/Chlorine.png"),
        require("../../assets/question/Argon.png"),
        require("../../assets/question/Potassium.png"),
        require("../../assets/question/Calcium.png"),
    ];
    

    const [dots, setDots] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
    const [totalDots, setTotalDots] = useState(0);

    const[dotTop, setdotTop] = useState(1);
    const[dotBottom, setdotBottom] = useState(1);
    const[dotRight, setdotRight] = useState(1);
    const[dotLeft, setdotLeft] = useState(1);

    // Add dot to top side
    const addDotTop = () => {
        setDots((prev) => ({
        ...prev,
        top: Math.min(prev.top + 1, MAX_DOTS_PER_SIDE),
        }));
        if(dotTop <= 2) {
            setdotTop(dotTop + 1);
            setTotalDots(totalDots + 1)
        }
    };

    // Remove dot from top side
    const removeDotTop = () => {
        setDots((prev) => ({
        ...prev,
        top: Math.max(prev.top - 1, 0),
        }));
        if(dotTop > 1) {
            setdotTop(dotTop - 1);
            setTotalDots(totalDots - 1)
        }
    };

    // Add dot to right side
    const addDotRight = () => {
        setDots((prev) => ({
        ...prev,
        right: Math.min(prev.right + 1, MAX_DOTS_PER_SIDE),
        }));
        if(dotRight <= 2) {
            setdotRight(dotRight + 1);
            setTotalDots(totalDots + 1)
        }
    };

    // Remove dot from right side
    const removeDotRight = () => {
        setDots((prev) => ({
        ...prev,
        right: Math.max(prev.right - 1, 0),
        }));
        if(dotRight > 1) {
            setdotRight(dotRight - 1);
            setTotalDots(totalDots - 1)
        }
    };

    // Add dot to bottom side
    const addDotBottom = () => {
        setDots((prev) => ({
        ...prev,
        bottom: Math.min(prev.bottom + 1, MAX_DOTS_PER_SIDE),
        }));
        if(dotBottom <= 2) {
            setdotBottom(dotBottom + 1);
            setTotalDots(totalDots + 1)
        }
    };

    // Remove dot from bottom side
    const removeDotBottom = () => {
        setDots((prev) => ({
        ...prev,
        bottom: Math.max(prev.bottom - 1, 0),
        }));
        if(dotBottom > 1) {
            setdotBottom(dotBottom - 1);
            setTotalDots(totalDots - 1)
        }
    };

    // Add dot to left side
    const addDotLeft = () => {
        setDots((prev) => ({
        ...prev,
        left: Math.min(prev.left + 1, MAX_DOTS_PER_SIDE),
        }));
        if(dotLeft <= 2) {
            setdotLeft(dotLeft + 1);
            setTotalDots(totalDots + 1)
        }
    };

    // Remove dot from left side
    const removeDotLeft = () => {
        setDots((prev) => ({
        ...prev,
        left: Math.max(prev.left - 1, 0),
        }));
        if(dotLeft > 1) {
            setdotLeft(dotLeft - 1);
            setTotalDots(totalDots - 1)
        }
    };

    const [randomNumber, setRandomNumber] = useState(0);
    const [elementNumberChosen, setElementNumberChosen] = useState(0);
    //const [answerValue, setAnswerValue] = useState(0);

    useEffect(() => {
        const number = Math.floor(Math.random() * 20); // Generates a number between 1 and 20
        setRandomNumber(number);
        setElementNumberChosen(number - 1);
    }, []); 

    const names = [
        { value: "1", name: 'H' },  // Hydrogen
        { value: "2", name: 'He' }, // Helium
        { value: "1", name: 'Li' }, // Lithium
        { value: "2", name: 'Be' }, // Beryllium
        { value: "3", name: 'B' },  // Boron
        { value: "4", name: 'C' },  // Carbon
        { value: "5", name: 'N' },  // Nitrogen
        { value: "6", name: 'O' },  // Oxygen
        { value: "7", name: 'F' },  // Fluorine
        { value: "8", name: 'Ne' }, // Neon
        { value: "1", name: 'Na' }, // Sodium
        { value: "2", name: 'Mg' }, // Magnesium
        { value: "3", name: 'Al' }, // Aluminum
        { value: "4", name: 'Si' }, // Silicon
        { value: "5", name: 'P' },  // Phosphorus
        { value: "6", name: 'S' },  // Sulfur
        { value: "7", name: 'Cl' }, // Chlorine
        { value: "8", name: 'Ar' }, // Argon
        { value: "1", name: 'K' },  // Potassium
        { value: "2", name: 'Ca' }  // Calcium
    ];

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
        console.log(totalDots);
        console.log(names[randomNumber].value)

        if (names[randomNumber].value == totalDots) {
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
        <div className="LessonElevenPointOne">
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
                <div className="LessonElevenPointOneBox">
                    <div className="LessonElevenPointOneBoxInnercont">
                        <div className="LessonElevenPointOneBoxTitle">
                            <h1>
                                Unit Eleven: Lewis-Dot Diagram
                            </h1>
                        </div>
                        <div className="LessonElevenPointOneContent">
                            <p className="LessonElevenPointOnePrompt">
                                Correctly form the Lewis-Dot Diagram {names[randomNumber].name}. The Bohr Model has been provided for reference.
                            </p>
                            <div className="LessonElevenPointOneRow">
                                <div className="LessonElevenPointOneImageSelector">
                                    <div className="LessonElevenPointOneImageContainer">
                                    <img
                                        id="LessonElevenSliderImage"
                                        src={images[randomNumber]}
                                        alt="Group Element"
                                        className="scrollable-image"
                                    />
                                    </div>
                                </div>

                                <div className="LessonElevenPointOneInput">
                                    <div className="LessonEleven-Lewis-Model-container">
                                    <div className="LessonEleven-Inner-Lewis-Model-container">
                                        {/* Top Dots */}
                                        <div className="Lewis-Dot-dots">{'• '.repeat(dots.top)}</div>

                                        {/* Structure: Left dots, Atom, Right dots */}
                                        <div className="Lewis-Dot-structure">
                                            <div className="side-dots">
                                            {Array(dots.left).fill("•").map((dot, index) => (
                                                <div key={`left-${index}`} className="dot">{dot}</div>
                                            ))}
                                            </div>

                                            <div className="Lewis-Dot-atom">{names[randomNumber].name}</div>

                                            <div className="side-dots">
                                            {Array(dots.right).fill("•").map((dot, index) => (
                                                <div key={`right-${index}`} className="dot">{dot}</div>
                                            ))}
                                            </div>
                                        </div>

                                        {/* Bottom Dots */}
                                        <div className="Lewis-Dot-dots">{'• '.repeat(dots.bottom)}</div>

                                        {/* Buttons */}
                                        <div className="buttons">
                                            <div className="button-group">
                                            <button onClick={() => addDotTop("top")}>Add Dot Above</button>
                                            <button onClick={() => removeDotTop("top")}>Remove Dot Above</button>
                                            </div>
                                            <div className="button-group">
                                            <button onClick={() => addDotRight("right")}>Add Dot Right</button>
                                            <button onClick={() => removeDotRight("right")}>Remove Dot Right</button>
                                            </div>
                                            <div className="button-group">
                                            <button onClick={() => addDotBottom("bottom")}>Add Dot Below</button>
                                            <button onClick={() => removeDotBottom("bottom")}>Remove Dot Below</button>
                                            </div>
                                            <div className="button-group">
                                            <button onClick={() => addDotLeft("left")}>Add Dot Left</button>
                                            <button onClick={() => removeDotLeft("left")}>Remove Dot Left</button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showNucleusFeedback && (
                                <div className="LessonElevenPointOneFeedback image-feedback">
                                    {nucleusFeedbackMessage}
                                </div>
                            )}
                            {feedbackMessage !== "" && (
                                <div
                                    className={
                                        "LessonElevenPointOneFeedback " +
                                        (isCorrect ? "correct" : "incorrect")
                                    }
                                >
                                    {feedbackMessage}
                                </div>
                            )}
                        </div>
                        <div className="submit-feedback-container">
                            <button
                                className="LessonElevenPointOneSubmit"
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

export default LessonElevenPointOne;
