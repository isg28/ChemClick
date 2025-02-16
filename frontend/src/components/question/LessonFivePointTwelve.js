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
import "../../styles/question/LessonFivePointTwelve.css";

function LessonFivePointTwelve() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem("studentId");
    const lessonId = "lesson5.12";

    const [goal, setGoal] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0);
    const [masteryLevel, setMasteryLevel] = useState(0);

    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
    const displayMedals = starsEarned >= 5;

    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);

    const options = [
        "The number of valence electrons is equal to the group number.",
        "The number of valence electrons is equal to the last digit of the group number.",
        "It is not.",
    ];

    useEffect(() => {
        if (!studentId) {
            console.error("Student ID not found");
            navigate("/login");
            return;
        }

        async function initializeData() {
            await fetchLessonData(lessonId, setGoal);
            await fetchLessonProgress(studentId, lessonId, {
                setCorrectAnswers,
                setIncorrectAnswers,
                setProgress,
                setMasteryLevel,
                setGoal,
                setTotalAttempts,
            });  
        }
        initializeData();
    }, [studentId, lessonId, navigate]);

    async function handleSubmit() {
        if (selectedAnswer === "") {
            alert("Please select an answer.");
            return;
        }

        if (
            selectedAnswer ===
            "The number of valence electrons is equal to the last digit of the group number."
        ) {
            setIsCorrect(true);
            await CorrectResponses({studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
            setFeedbackMessage("Correct! Click done to go to the Dashboard.");
        } else {
            setIsCorrect(false);
            await IncorrectResponses({studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });
            setFeedbackMessage("Incorrect. Please try again.");
        }
        setIsSubmitted(true);
    }

    function handleDone() {
        navigate("/dashboard");
    }

    function handleTryAgain() {
        setSelectedAnswer("");
        setIsSubmitted(false);
        setFeedbackMessage("");
        setIsCorrect(null);
    }

    function handleButtonClick() {
        if (!isSubmitted) {
            handleSubmit();
        } else {
            if (isCorrect) {
                handleDone();
            } else {
                handleTryAgain();
            }
        }
    }

    let buttonText = "Submit Answer";
    if (isSubmitted) {
        if (isCorrect) {
            buttonText = "Done";
        } else {
            buttonText = "Try Again";
        }
    }

    function handleOptionChange(e) {
        if (isSubmitted) {
            setIsSubmitted(false);
            setFeedbackMessage("");
            setIsCorrect(null);
        }
        setSelectedAnswer(e.target.value);
    }

    const images = [
        require("../../assets/question/Group13.png"),
        require("../../assets/question/Group14.png"),
        require("../../assets/question/Group15.png"),
        require("../../assets/question/Group16.png"),
        require("../../assets/question/Group17.png"),
        require("../../assets/question/Group18.png")
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showImageFeedback, setShowImageFeedback] = useState(false);
    const [imageFeedbackMessage, setImageFeedbackMessage] = useState("Click and scroll through the images to view previous answers");

    function prevImage() {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
        updateImageFeedback(newIndex);
    }

    function nextImage() {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
        updateImageFeedback(newIndex);
    }

    function updateImageFeedback(index) {
        switch (index) {
            case 0:
                setImageFeedbackMessage("Group 13: The number of valence electrons is equal to the last digit of the group number.");
                break;
            case 1:
                setImageFeedbackMessage("Group 14: The number of valence electrons is equal to the last digit of the group number.");
                break;
            case 2:
                setImageFeedbackMessage("Group 15: The number of valence electrons is equal to the last digit of the group number.");
                break;
            case 3:
                setImageFeedbackMessage("Group 16: The number of valence electrons is equal to the last digit of the group number.");
                break;
            case 4:
                setImageFeedbackMessage("Group 17: The number of valence electrons is equal to the last digit of the group number.");
                break;
            case 5:
                setImageFeedbackMessage("Group 18: It is not.");
                break;
            default:
                break;
        }
    }

    function handleImageClick() {
        setShowImageFeedback(true);
        setTimeout(() => setShowImageFeedback(false), 6000);
    }

    return (
        <div className="LessonFivePointTwelve">
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
                <div className="LessonFivePointTwelveBox">
                    <div className="LessonFivePointTwelveBoxInnercont">
                        <div className="LessonFivePointTwelveBoxTitle">
                            <h1>
                                Unit Five: Periodic Trends (Valence Electrons) -
                                Group 13 - 18
                            </h1>
                        </div>
                        <div className="LessonFivePointTwelveContent">
                            <p className="LessonFivePointTwelvePrompt">
                                How does Group 13 through Group 18's group number relate to its
                                valence electrons? View previous answers through images
                            </p>
                            <div className="LessonFivePointTwelveRow">
                                <div className="LessonFivePointTwelveImageSelector">
                                    <div className="LessonFivePointTwelveArrows">
                                        <button className="LessonFiveArrowLeft" onClick={prevImage}>&#10094;</button>
                                        <button className="LessonFiveArrowRight" onClick={nextImage}>&#10095;</button>
                                    </div>
                                    <div className="LessonFivePointTwelveImageContainer">
                                    <img
                                        id="LessonFiveSliderImage"
                                        src={images[currentIndex]}
                                        alt="Group Element"
                                        className="scrollable-image"
                                        onClick={handleImageClick}
                                        style={{ cursor: "pointer" }}
                                    />
                                    </div>
                                </div>

                                <div className="LessonFivePointTwelveInput">
                                    {options.map(function (option, index) {
                                        return (
                                            <div
                                                key={index}
                                                style={{ marginBottom: "10px" }}
                                            >
                                                <input
                                                    type="radio"
                                                    id={"option-" + index}
                                                    name="mcq"
                                                    value={option}
                                                    checked={
                                                        selectedAnswer ===
                                                        option
                                                    }
                                                    onChange={
                                                        handleOptionChange
                                                    }
                                                />
                                                <label
                                                    htmlFor={"option-" + index}
                                                    style={{
                                                        marginLeft: "10px",
                                                        fontSize: "1.3rem",
                                                    }}
                                                >
                                                    {option}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {showImageFeedback && (
                                <div className="LessonFivePointTwelveFeedback image-feedback">
                                    {imageFeedbackMessage}
                                </div>
                            )}
                            {feedbackMessage !== "" && (
                                <div
                                    className={
                                        "LessonFivePointTwelveFeedback " +
                                        (isCorrect ? "correct" : "incorrect")
                                    }
                                >
                                    {feedbackMessage}
                                </div>
                            )}
                        </div>
                        <div className="submit-feedback-container">
                            <button
                                className="LessonFivePointTwelveSubmit"
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

export default LessonFivePointTwelve;
