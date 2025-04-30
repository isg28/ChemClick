import React, { useRef, useState, useEffect } from "react";
import '../../styles/question/Question.css';
import {useNavigate } from 'react-router-dom';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointOne.css';
import '../../styles/question/LessonNinePointOne.css';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from './LessonUtils';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PositiveIon from "../../assets/question/+1ioncomb-transparent.png";
import NegativeIon from "../../assets/question/-1ioncomb-transparent.png";
import PositiveIon2 from "../../assets/question/+2ioncomb-transparent.png";
import NegativeIon2 from "../../assets/question/-2ioncomb-transparent.png";
import PositiveIon3 from "../../assets/question/+3ioncomb-transparent.png";
import NegativeIon3 from "../../assets/question/-3ioncomb-transparent.png";
import {motion} from "framer-motion";

const ionImages = {
    "+1": PositiveIon,
    "-1": NegativeIon,
    "+2": PositiveIon2,
    "-2": NegativeIon2,
    "+3": PositiveIon3,
    "-3": NegativeIon3,
};

const ItemType = "ION";

// Draggable Ion Component
const DraggableIon = ({ ionType, src }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType,
        item: { ionType, src },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <img
            ref={drag}
            src={src}
            alt={`Ion ${ionType}`}
            className="ion-comb-image"
            style={{ width: '50px', height: '50px', opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}
        />
    );
};



// Drop Zone Component
const DropZone = ({ droppedIons = [], onDrop, onRemoveIon, isPositiveIon }) => {
    const dropZoneRef = useRef(null);
    const [isOver, setIsOver] = useState(false);

    const [{ isOver: isOverMonitor }, drop] = useDrop(() => ({
        accept: "ION",
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const handleRemoveIon = (index) => {
        onRemoveIon(index);
    };

    // Determine direction based on the positive/negative ion state
    const slideDirection = isPositiveIon ? 'left' : 'right'; // Left for positive, right for negative
    // Calculate the size of the images based on the number of dropped ions
    const imageSize = droppedIons.length === 1 ? 100 : Math.max(30, 105 - droppedIons.length * 20);
    const overlapAmount = Math.min(2000, droppedIons.length * 5);

    return (
        <div
            ref={(node) => {
                drop(node);
                dropZoneRef.current = node;
            }}
            className="drop-zone"
            style={{
                width: "200px",
                height: "200px",
                border: "2px dashed gray",
                backgroundColor: isOver ? "#d3f9d8" : "#f0f0f0",
                display: "flex",
                //flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                flexDirection: "column",
                position: "relative",
                gap: "-5px",
            }}
        >
            {droppedIons.length === 0 ? (
                <p>Drop Ions Here</p>
            ) : (
                droppedIons.map((ion, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: 0, y: 0 }} // Start position
                        animate={{
                            x: slideDirection === 'left' ? -100 : 100, // Move left for positive ions, right for negative ions
                            y: 0,
                        }} // Moves to its resting place
                        transition={{ type: "spring", stiffness: 100 }}
                        style={{ position: "relative",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "-10px", // Make them touch by fully overlapping
                                marginBottom: "-20px", // Make them touch by
                            }}
                    >
                        <img
                            src={ion.src}
                            alt={`Dropped Ion ${ion.ionType}`}
                            className="dropped-ion-image"
                            style={{
                                width: `${imageSize}px`, // Adjust image size dynamically
                                height: `${imageSize}px`, // Maintain the same width and height

                            }}
                        />
                        <button
                            onClick={() => handleRemoveIon(index)}
                            style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                            }}
                        >
                            X
                        </button>
                    </motion.div>
                ))
            )}
        </div>
    );
};

function getRandomIonImage() {
    const ionTypes = Object.keys(ionImages);
    const randomIonType = ionTypes[Math.floor(Math.random() * ionTypes.length)];
    return ionImages[randomIonType];
}
function LessonNinePointOne(){
    const navigate = useNavigate();

    const [randomNumber, setRandomNumber] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('');
    const [randomIon, setRandomIon] = useState(getRandomIonImage()); // Random ion image state
    const [ions, setIons] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [animateIons, setAnimateIons] = useState(false);
    const [droppedIons, setDroppedIons] = useState([]);
    const [canSubmit, setCanSubmit] = useState(false);
    const [questionText, setQuestionText] = useState('');  // Add state for question text


    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;      
    const lessonId = 'lesson9.1'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
    const displayMedals = starsEarned >= 5;
    const [isPositiveIon, setIsPositiveIon] = useState(false); // State for ion type

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const generateRandomNumberAndPosition = () => {
        // Restrict random number to valid values based on ion type
        const randomNum = randomIon === PositiveIon3 || randomIon === NegativeIon3
            ? Math.floor(Math.random() * 3) + 1 // Generates 1, 2, or 3 for +3/-3 ions
            : randomIon === PositiveIon2 || randomIon === NegativeIon2
            ? Math.floor(Math.random() * 2) + 1 // Generates 1 or 2 for +2/-2 ions
            : 1 // Default behavior for other ions
    
        setRandomNumber(randomNum);  // Update the random number state
    };

    useEffect(() => {
        const checkIonType = () => {
            // Check if the ion is positive or negative based on the ion image path
            if (
                randomIon === PositiveIon || 
                randomIon === PositiveIon2 || 
                randomIon === PositiveIon3
            ) {
                setIsPositiveIon(true); // Positive Ion
            } else {
                setIsPositiveIon(false); // Negative Ion
            }
        };
    
        checkIonType(); // Update ion type whenever randomIon changes
    }, [randomIon]); // Re-run when randomIon changes

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

        generateRandomNumberAndPosition();
    }, [userId, lessonId, navigate, isTeacher]);

        const [nextLessonLocked, setNextLessonLocked] = useState(true);
        useEffect(() => {
            const checkNextLessonStatus = async () => {
            const nextLessonId = 'lesson9.2'; 
            try {
                const isLocal = window.location.hostname.includes('localhost');
                const BASE_URL = isLocal
                            ? 'http://localhost:8000'
                            : 'https://chemclick.onrender.com';
                const res = await fetch(`${BASE_URL}/lessons/${nextLessonId}`);
                const data = await res.json();
                setNextLessonLocked(data.status === 'locked');
            } catch (error) {
                console.error("Failed to check next lesson lock status:", error);
            }
        };
            
        checkNextLessonStatus();
        }, []);       

    useEffect(() => {
        if (progress === 100) {
            setShowCompletionModal(true);
        }
    }, [progress]);

    const handleDrop = (item) => {
        setDroppedIons((prev) => [...prev, item]);
    };

    const handleRemoveIon = (index) => {
        setDroppedIons((prev) => prev.filter((_, i) => i !== index)); // Remove the ion at the given index
    };

    //const isPositiveIon = randomIon === PositiveIon || randomIon === PositiveIon2 || randomIon === PositiveIon3;

    const getIonTypeFromPath = (path) => {
        // Extract the ion type from the image path, e.g., +3 or -3
        if (path.includes("+3")) return "+3";
        if (path.includes("-3")) return "-3";
        if (path.includes("+2")) return "+2";
        if (path.includes("-2")) return "-2";
        if (path.includes("+1")) return "+1";
        if (path.includes("-1")) return "-1";
        return null;  // Return null if no match
    };

    

    const getQuestionText = () => {
        const ionType = getIonTypeFromPath(randomIon);  // Get ion type from image path
        console.log("Ion Type:", ionType);  
    
        console.log("Ion Type:", ionType);  // Debugging
    
        // Check for +1 or -1 ions
        if (ionType === "+1" || ionType === "-1") {
            return 'For this question, please use the +/- 1 combs to balance this ion.';
        }
    
        // Check for +2 or -2 ions
        if (ionType === "+2" || ionType === "-2") {
            if (randomNumber === 1) {
                return 'For this question, please use the 1 +/- combs to balance this ion.';
            } else if (randomNumber === 2) {
                return 'For this question, please use the 2 +/- combs to balance this ion.';
            }
        }
    
        // Check for +3 or -3 ions
        if (ionType === "+3" || ionType === "-3") {
            console.log("Random Number for +3 ion: ", randomNumber);  // Debugging
    
            if (randomNumber === 1) {
                return 'For this question, please use the 3 +/- combs to balance this ion.';
            } else if (randomNumber === 2) {
                return 'For this question, please use the 2 +/- and the 1 +/- combs to balance this ion.';
            } else if (randomNumber === 3) {
                return 'For this question, please use the 1 +/- combs to balance this ion.';
            }
        }
    
        // Default return if no conditions match
        return ''; 
    };


    const isCorrectCombination = () => {
        const ionCounts = droppedIons.reduce((counts, ion) => {
            counts[ion.ionType] = (counts[ion.ionType] || 0) + 1;
            return counts;
        }, {});
    
        // Check combinations based on ion type and random number
    
        if (randomIon === PositiveIon) {
            return ionCounts["-1"] === 1; // +1 ion, should have one -1 comb
        }
    
        if (randomIon === NegativeIon) {
            return ionCounts["+1"] === 1; // -1 ion, should have one +1 comb
        }
    
        if (randomIon === PositiveIon2) {
            if (randomNumber === 1) {
                return ionCounts["-1"] === 2; // +2 ion with randomNumber 1, should have two -1 combs
            } else if (randomNumber === 2) {
                return ionCounts["-2"] === 1; // +2 ion with randomNumber 2, should have one -2 comb
            }
        }
    
        if (randomIon === NegativeIon2) {
            if (randomNumber === 1) {
                return ionCounts["+1"] === 2; // -2 ion with randomNumber 1, should have two +1 combs
            } else if (randomNumber === 2) {
                return ionCounts["+2"] === 1; // -2 ion with randomNumber 2, should have one +2 comb
            }
        }
    
        if (randomIon === PositiveIon3) {
            if (randomNumber === 1) {
                return ionCounts["-3"] === 1; // +3 ion with randomNumber 1, should have one -3 comb
            } else if (randomNumber === 2) {
                return ionCounts["-2"] === 1 && ionCounts["-1"] === 1; // +3 ion with randomNumber 2, should have one -2 and two -1 combs
            } else if (randomNumber === 3) {
                return ionCounts["-1"] === 3; // +3 ion with randomNumber 3, should have three -1 combs
            }
        }
    
        if (randomIon === NegativeIon3) {
            if (randomNumber === 1) {
                return ionCounts["+3"] === 1; // -3 ion with randomNumber 1, should have one +3 comb
            } else if (randomNumber === 2) {
                return ionCounts["+2"] === 1 && ionCounts["+1"] === 1; // -3 ion with randomNumber 2, should have one +2 and two +1 combs
            } else if (randomNumber === 3) {
                return ionCounts["+1"] === 3; // -3 ion with randomNumber 3, should have three +1 combs
            }
        }
    
        return false; // Default return for invalid combination
    };

    const handleSubmit = async () => {
        if (isCorrectCombination()) {
            setFeedbackMessage('Correct! Moving on to the next question...');
            setFeedbackClass('correct');
            await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
            setDroppedIons([]); // Reset dropped ions for the next question
    
            // Update random ion and number in sequence with a slight delay for smooth transition
            setTimeout(() => {
                setRandomIon(getRandomIonImage()); // Generate a new random ion
                generateRandomNumberAndPosition(); // Generate new random number
                setFeedbackMessage('');
                setFeedbackClass('');
            }, 1500); // Delay to allow state updates to happen sequentially
        } else {
            setFeedbackMessage('Incorrect. Please look closely at the combs that need to be used to balance out the ion!');
            setFeedbackClass('incorrect');
            await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });
            setTimeout(() => {
                setFeedbackMessage('');
                setFeedbackClass('');
            }, 4000);
        }
    };

    useEffect(() => {
        console.log("randomIon:", randomIon);
        console.log("randomNumber:", randomNumber);
        const questionText = getQuestionText();
        console.log("Updated Question:", questionText);
        setQuestionText(questionText);  // Update state for question text dynamically
    }, [randomIon, randomNumber]);
    

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
                            <h1>Unit Nine: Ionic Compounds</h1>
                        </div>
                        <div className='lesson-nine-point-one-content'>
                            <p className='lesson-one-point-one-prompt'>
                                Each comb simulates an ion. Click and drag the provided combs to make an ionic compound, creating a neutral charge. Drag the appropriate combs into the dropzone with your mouse to create a rectangle, simulating an ionic compound.
                            </p>
                            <div className="lesson-one-point-one-measurement-container">
                                <div className="ions-container-top" style={{ flexDirection: isPositiveIon ? 'row-reverse' : 'row' }}>
                                <DropZone onDrop={handleDrop} droppedIons={droppedIons} onRemoveIon={handleRemoveIon} isPositiveIon={isPositiveIon}/>
                                    {/* Random ion image */}
                                    <img
                                        src={randomIon}
                                        alt="Random Ion"
                                        className="random-ion-image"
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                </div>
                            {/* Separator */}
                            <div className="separator-line"></div>

                        <div className="ions-container-bottom">
                            {/* Ion combs images */}
                            {Object.keys(ionImages).map((ionType) => (
                                <DraggableIon key={ionType} ionType={ionType} src={ionImages[ionType]} />
                            ))}
                        </div>
                </div>


                            <hr className="separator" />
                            <div className='lesson-nine-point-one-question'>
                                <h1> {getQuestionText()} </h1>
                                <div className="submit-feedback-container">
                                    <div className={`lesson-nine-point-one-feedback ${feedbackClass}`}>
                                    <p>{feedbackMessage}</p>
                                    </div>
                                    <button className='lesson-one-point-one-submit' onClick={handleSubmit} >Submit Answer</button>
                                </div>
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
                        className={`next-lesson-button ${nextLessonLocked ? 'locked' : ''}`} 
                        onClick={() => {
                            if (!nextLessonLocked) navigate('/lessonninepointtwo');
                        }}
                        >
                        {nextLessonLocked ? 'Locked' : 'Next Lesson'}
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
    </DndProvider>
        
    );
}


export default LessonNinePointOne;