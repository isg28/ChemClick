import React, { useState, useEffect } from "react";
import '../../styles/question/Question.css';
import {useNavigate } from 'react-router-dom';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointOne.css';
import '../../styles/question/LessonEightPointOne.css';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PositiveIon from "../../assets/question/+1ioncomb-transparent.png";
import NegativeIon from "../../assets/question/-1ioncomb-transparent.png";
import PositiveIon2 from "../../assets/question/+2ioncomb-transparent.png";
import NegativeIon2 from "../../assets/question/-2ioncomb-transparent.png";
import PositiveIon3 from "../../assets/question/+3ioncomb-transparent.png";
import NegativeIon3 from "../../assets/question/-3ioncomb-transparent.png";

const ItemTypes = {
    ION: "ion",
};

function Ion({ src, type }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.ION,
        item: { type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <img
            ref={drag}
            src={src}
            alt={`${type} ion`}
            className={`ion ${isDragging ? "dragging" : ""}`}
            style={{ opacity: isDragging ? 0.5 : 1,
                width: "70px",
                height:"70px",
                cursor:"grab",
            }}
        />
    );
}

function DropZone({ onDrop, ionsDropped, setIonsDropped }) {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.ION,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    const isActive = canDrop && isOver;
    let backgroundColor = "white";
    if (isActive) backgroundColor = "lightgreen";
    else if (canDrop) backgroundColor = "lightblue";

    const handleDelete = (index) => {
        setIonsDropped((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div
            ref={drop}
            className="dropzone"
            style={{
                backgroundColor,
                width: "100%",
                height: "100%",
                border: "1px dashed black",
                position: "relative",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {ionsDropped.map((ion, index) => (
                <div key={index} style={{ position: 'relative' }}>
                    <img
                        src={ion.src}
                        alt={`${ion.type} ion`}
                        className="dropped-ion"
                        style={{
                            width: "70px",
                            height: "70px",
                            margin: "5px",
                        }}
                    />
                    <button
                        onClick={() => handleDelete(index)}
                        style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            padding: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        X
                    </button>
                </div>
            ))}
        </div>
    );
}

function LessonEightPointOne(){
    const navigate = useNavigate();

    const [randomNumber, setRandomNumber] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('');
    const [ions, setIons] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [ionsDropped, setIonsDropped] = useState([]);

    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson8.1'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const { starsEarned, stars } = renderStars(masteryLevel);
    const displayMedals = starsEarned >= 5;

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const generateRandomNumberAndPosition = () => {
        const randomNum = (Math.random() * 2 + 1).toFixed(0);
        setRandomNumber(randomNum);
    };

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

        generateRandomNumberAndPosition();
    }, [studentId, lessonId, navigate]);

    const handleDrop = (item) => {
        let src;
        switch (item.type) {
            case "+1":
                src = PositiveIon;
                break;
            case "-1":
                src = NegativeIon;
                break;
            case "+2":
                src = PositiveIon2;
                break;
            case "-2":
                src = NegativeIon2;
                break;
            case "+3":
                src = PositiveIon3;
                break;
            case "-3":
                src = NegativeIon3;
                break;
            default:
                src = "";
        }
        setIonsDropped((prev) => [
            ...prev,
            { type: item.type, src },
        ]);

        // Check if ions are balanced (equal number of + and - ions)
        const positiveCount = [...ionsDropped, item].filter((ion) => ion.type.startsWith("+")).length;
        const negativeCount = [...ionsDropped, item].filter((ion) => ion.type.startsWith("-")).length;
        setIsCorrect(positiveCount === negativeCount);
    };

    // Check if the ions dropped are balanced (charge sum = 0)
    const checkIfCorrect = () => {
        const totalCharge = ionsDropped.reduce((sum, ion) => {
            switch (ion.type) {
                case "+1":
                    return sum + 1;
                case "-1":
                    return sum - 1;
                case "+2":
                    return sum + 2;
                case "-2":
                    return sum - 2;
                case "+3":
                    return sum + 3;
                case "-3":
                    return sum - 3;
                default:
                    return sum;
            }
        }, 0);
        return totalCharge === 0;
    };

    const handleSubmit = () => {
        setIsCorrect(checkIfCorrect()); // Check if the ion charges balance to 0
        setFeedbackMessage(isCorrect ? "Correct!" : "Correct!");
        setFeedbackClass(isCorrect ? "correct" : "incorrect");
        generateRandomNumberAndPosition(); // Generate a new random question
        setIonsDropped([]); // Reset ions dropped after submit
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='lesson-one-point-one'>
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
                <div className='lesson-one-point-one-box'>
                    <div className='lesson-one-point-one-box-innercont'>
                        <div className='lesson-one-point-one-box-title'>
                            <h1>Unit Eight: Ionic Compounds</h1>
                        </div>
                        <div className='lesson-one-point-one-content'>
                            <p className='lesson-one-point-one-prompt'>
                                Create the specified amount of ions using the combs provided. Drag the combs together with your mouse to create a rectangle, simulating an ion. To delete a comb, press the red X.
                            </p>
                            <div className="lesson-one-point-one-measurement-container">
                                <div className= "ions-container">
                                <Ion src={NegativeIon2} type="-2" />
                                <Ion src={PositiveIon} type="+1" />
                                <Ion src={PositiveIon3} type="+3" />
                                <Ion src={NegativeIon} type="-1" />
                                <Ion src={PositiveIon2} type="+2" />
                                <Ion src={NegativeIon3} type="-3" />
                                </div>
                                <DropZone onDrop={handleDrop} ionsDropped ={ionsDropped} setIonsDropped={setIonsDropped}/>

                            </div>


                            <hr className="separator" />
                            <div className='lesson-one-point-one-question'>
                                <h1>Click and drag the provided combs to create the {randomNumber} ion. </h1>
                            </div>
                        </div>
                        <div className="submit-feedback-container">
                            <button className='lesson-one-point-one-submit' onClick={handleSubmit}>Submit Answer</button>
                            <div className={`lesson-one-point-one-feedback ${feedbackClass}`}>
                            <p>{feedbackMessage}</p>
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
                        <div className='side-column-box'>
                            <div className='side-column-box-title'><h1>Progress</h1></div>
                            <div className='side-column-box-info'>              
                                <div className="progressbox">
                                    <div
                                        className="progressbar"
                                        style={{ '--progress': progress }}
                                    ></div>
                                    <div className="progress-text">
                                        Current Topic Progress: {progress.toFixed(1)}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DndProvider>
        
    );
}


export default LessonEightPointOne;