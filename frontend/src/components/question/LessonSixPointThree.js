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
import "../../styles/question/LessonSixPointOne.css";

function LessonSixPointThree() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;     
    const lessonId = "lesson6.3";

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

    const [valenceElectrons, setValenceElectrons] = useState(1);
    const [charge, setCharge] = useState(0);
    const [glow, setGlow] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showNucleusFeedback, setShowNucleusFeedback] = useState(false);
    const nucleusFeedbackMessage = useState("A monatomic ion is created by adding or removing only valence electrons.");

    const images = [
        require("../../assets/question/HeL6.png"),
        require("../../assets/question/NeL6.png"),
        require("../../assets/question/ArL6.png"),
    ];

    const electronPositions = [
        { shell: 1, count: valenceElectrons, radius: 40 },
    ];

    const handleAddElectron = () => {
        if (valenceElectrons < 2) {
        setValenceElectrons(valenceElectrons + 1);
        setCharge(charge - 1);
        }
    };

    const handleRemoveElectron = () => {
        if (valenceElectrons > 0) {
            setValenceElectrons(valenceElectrons - 1);
            setCharge(charge + 1);
        }
    };

    const handleNucleusClick = () => {
        setGlow(true);
        setTimeout(() => setGlow(false), 12000);
        setShowNucleusFeedback(true);
        setTimeout(() => setShowNucleusFeedback(false), 12000);
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

    async function handleSubmit() {
        console.log(charge);

        if (charge === -1) {
            setIsCorrect(true);
            await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
            setFeedbackMessage("Correct! Click done to go to the Dashboard.");
        } else {
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


    function prevImage() {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
    }

    function nextImage() {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
    }

    return (
        <div className="LessonSixPointOne">
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
                <div className="LessonSixPointOneBox">
                    <div className="LessonSixPointOneBoxInnercont">
                        <div className="LessonSixPointOneBoxTitle">
                            <h1>
                                Unit Six: Forming Monatomic Ions
                            </h1>
                        </div>
                        <div className="LessonSixPointOneContent">
                            <p className="LessonSixPointOnePrompt">
                                Correctly form the noble gas configuration for Hydrogen. Three elements have been provided
                                for reference.
                            </p>
                            <div className="LessonSixPointOneRow">
                                <div className="LessonSixPointOneImageSelector">
                                    <div className="LessonSixPointOneArrows">
                                        <button className="LessonFiveArrowLeft" onClick={prevImage}>&#10094;</button>
                                        <button className="LessonFiveArrowRight" onClick={nextImage}>&#10095;</button>
                                    </div>
                                    <div className="LessonSixPointOneImageContainer">
                                    <img
                                        id="LessonFiveSliderImage"
                                        src={images[currentIndex]}
                                        alt="Group Element"
                                        className="scrollable-image"
                                    />
                                    </div>
                                </div>

                                <div className="LessonSixPointOneInput">
                                    <div className="LessonSix-bohr-model-container">
                                        <h2>Bohr Model of Hydrogen</h2>
                                        <div className= "LessonSix-bohr-model">
                                            <div className="nucleus" onClick={handleNucleusClick}></div>
                                                {electronPositions.map((shell, index) => (
                                                <div key={index} className={`LessonSix-electron-shell ${glow ? 'glow' : ''}`} style={{ width: shell.radius * 2, height: shell.radius * 2 }}>
                                                    {[...Array(shell.count)].map((_, i) => (
                                                    <div key={i} className="electron" style={{ transform: `rotate(${(360 / shell.count) * i}deg) translate(${shell.radius}px) rotate(-${(360 / shell.count) * i}deg)` }}></div>
                                                    ))}
                                                </div>
                                                ))}
                                        </div>
                                        <p>Valence Electrons: {valenceElectrons}</p>
                                        <p>Charge: {charge > 0 ? `${charge}+` : charge < 0 ? `${Math.abs(charge)}-` : "0"}</p>
                                        <button onClick={handleAddElectron}>Add Electron</button>
                                        <button onClick={handleRemoveElectron}>Remove Electron</button>
                                    </div>
                                </div>
                            </div>
                            {showNucleusFeedback && (
                                <div className="LessonSixPointOneFeedback image-feedback">
                                    {nucleusFeedbackMessage}
                                </div>
                            )}
                            {feedbackMessage !== "" && (
                                <div
                                    className={
                                        "LessonSixPointOneFeedback " +
                                        (isCorrect ? "correct" : "incorrect")
                                    }
                                >
                                    {feedbackMessage}
                                </div>
                            )}
                        </div>
                        <div className="submit-feedback-container">
                            <button
                                className="LessonSixPointOneSubmit"
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
                    {/* Next Lesson button positioned below the Goals box */}
                    <div className="next-lesson-button-container" style={{ marginTop: '20px' }}>
                        <button 
                            className="next-lesson-button" 
                            onClick={() => navigate('/lessonsixpointfour')}
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
        </div>
    );
}

export default LessonSixPointThree;
