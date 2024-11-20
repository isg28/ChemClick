import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointSeven.css';
import { useNavigate } from 'react-router-dom';

function LessonOnePointSeven() {
    const navigate = useNavigate();

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const positions = [
        { value: "0", position: -103.5 },
        { value: "0.1", position: -104.5 },
        { value: "0.2", position: -106.3 },
        { value: "0.3", position: -107.6 },
        { value: "0.4", position: -108.9 },
        { value: "0.5", position: -110.1 },
        { value: "0.6", position: -111.4 },
        { value: "0.7", position: -112.5 },
        { value: "0.8", position: -114 },
        { value: "0.9", position: -115.9 },
        { value: "1.0", position: -117.2 },
        { value: "1.1", position: -118.4 },
        { value: "1.2", position: -119.6 },
        { value: "1.3", position: -121 },
        { value: "1.4", position: -122.5 },
        { value: "1.5", position: -123.9 },
        { value: "1.6", position: -125.1 },
        { value: "1.7", position: -126.5 },
        { value: "1.8", position: -127.8 },
        { value: "1.9", position: -129.7 },
        { value: "2.0", position: -131.5 },
        { value: "2.1", position: -132.5 },
        { value: "2.2", position: -133.7 },
        { value: "2.3", position: -135.2 },
        { value: "2.4", position: -136.4 },
        { value: "2.5", position: -137.7 },
        { value: "2.6", position: -139 },
        { value: "2.7", position: -140.5 },
        { value: "2.8", position: -142 },
        { value: "2.9", position: -143.5 },
        { value: "3.0", position: -145.2 },
        { value: "3.1", position: -146.5 },
        { value: "3.2", position: -148 },
        { value: "3.3", position: -149.5 },
        { value: "3.4", position: -150.7 },
        { value: "3.5", position: -151.7 },
        { value: "3.6", position: -153.2 },
        { value: "3.7", position: -154.5 },
        { value: "3.8", position: -156 },
        { value: "3.9", position: -158 },
        { value: "4.0", position: -159 },
        { value: "4.1", position: -160 },
        { value: "4.2", position: -161.5 },
        { value: "4.3", position: -163 },
        { value: "4.4", position: -164.5 },
        { value: "4.5", position: -165.7 },
        { value: "4.6", position: -167 },
        { value: "4.7", position: -168.5 },
        { value: "4.8", position: -170 },
        { value: "4.9", position: -171.3 },
        { value: "5.0", position: -172.8 },
        { value: "5.1", position: -174.2 },
        { value: "5.2", position: -175.5 },
        { value: "5.3", position: -177 },
        { value: "5.4", position: -178.2 },
        { value: "5.5", position: -179.5 },
        { value: "5.6", position: -181 },
        { value: "5.7", position: -182.5 },
        { value: "5.8", position: -184 },
        { value: "5.9", position: -185.5 },
        
    ];

    const questions = positions.map(pos => ({
        value: pos.value,
        positionType: pos.type,
        cursorPosition: `${pos.position}%`
    }));

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [randomizedQuestions, setRandomizedQuestions] = useState([]);
    const [currentPositionIndex, setCurrentPositionIndex] = useState(positions.length / 2); // start at middle position
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [bubbles, setBubbles] = useState([]); 

    const calculateHeight = () => {
        return currentPositionIndex <= 1
            ? `${(currentPositionIndex / (positions.length - 1)) * 400}%`
            : currentPositionIndex <= 2
            ? `${(currentPositionIndex / (positions.length - 1)) * 250}%`
            : currentPositionIndex <= 3
            ? `${(currentPositionIndex / (positions.length - 1)) * 195}%`
            : currentPositionIndex <= 4
            ? `${(currentPositionIndex / (positions.length - 1)) * 164}%`
            : currentPositionIndex <= 5
            ? `${(currentPositionIndex / (positions.length - 1)) * 147}%`
            : currentPositionIndex <= 6
            ? `${(currentPositionIndex / (positions.length - 1)) * 135}%`
            : currentPositionIndex <= 7
            ? `${(currentPositionIndex / (positions.length - 1)) * 125}%`
            : currentPositionIndex <= 8
            ? `${(currentPositionIndex / (positions.length - 1)) * 120}%`
            : currentPositionIndex <= 9
            ? `${(currentPositionIndex / (positions.length - 1)) * 120}%`
            : currentPositionIndex <= 10
            ? `${(currentPositionIndex / (positions.length - 1)) * 115}%`
            : currentPositionIndex <= 11
            ? `${(currentPositionIndex / (positions.length - 1)) * 112}%`
            : currentPositionIndex <= 12
            ? `${(currentPositionIndex / (positions.length - 1)) * 108}%`
            : currentPositionIndex <= 13
            ? `${(currentPositionIndex / (positions.length - 1)) * 105}%`
            : currentPositionIndex <= 14
            ? `${(currentPositionIndex / (positions.length - 1)) * 105}%`
            : currentPositionIndex <= 15
            ? `${(currentPositionIndex / (positions.length - 1)) * 103}%`
            : currentPositionIndex <= 16
            ? `${(currentPositionIndex / (positions.length - 1)) * 102}%`
            : currentPositionIndex <= 17
            ? `${(currentPositionIndex / (positions.length - 1)) * 100}%`
            : currentPositionIndex <= 18
            ? `${(currentPositionIndex / (positions.length - 1)) * 98}%`
            : currentPositionIndex <= 19
            ? `${(currentPositionIndex / (positions.length - 1)) * 100}%`
            : currentPositionIndex <= 20
            ? `${(currentPositionIndex / (positions.length - 1)) * 99}%`
            : currentPositionIndex <= 21
            ? `${(currentPositionIndex / (positions.length - 1)) * 98}%`
            : currentPositionIndex <= 22
            ? `${(currentPositionIndex / (positions.length - 1)) * 96}%`
            : currentPositionIndex <= 23
            ? `${(currentPositionIndex / (positions.length - 1)) * 96}%`
            : currentPositionIndex <= 24
            ? `${(currentPositionIndex / (positions.length - 1)) * 95}%`
            : currentPositionIndex <= 25
            ? `${(currentPositionIndex / (positions.length - 1)) * 94}%`
            : currentPositionIndex <= 26
            ? `${(currentPositionIndex / (positions.length - 1)) * 94}%`
            : currentPositionIndex <= 27
            ? `${(currentPositionIndex / (positions.length - 1)) * 94}%`
            : currentPositionIndex <= 28
            ? `${(currentPositionIndex / (positions.length - 1)) * 93}%`
            : currentPositionIndex <= 29
            ? `${(currentPositionIndex / (positions.length - 1)) * 93}%`
            : currentPositionIndex <= 30
            ? `${(currentPositionIndex / (positions.length - 1)) * 93.2}%`
            : currentPositionIndex <= 31
            ? `${(currentPositionIndex / (positions.length - 1)) * 93}%`
            : currentPositionIndex <= 32
            ? `${(currentPositionIndex / (positions.length - 1)) * 92.5}%`
            : currentPositionIndex <= 33
            ? `${(currentPositionIndex / (positions.length - 1)) * 92.5}%`
            : currentPositionIndex <= 34
            ? `${(currentPositionIndex / (positions.length - 1)) * 92}%`
            : currentPositionIndex <= 35
            ? `${(currentPositionIndex / (positions.length - 1)) * 91}%`
            : currentPositionIndex <= 36
            ? `${(currentPositionIndex / (positions.length - 1)) * 91}%`
            : currentPositionIndex <= 37
            ? `${(currentPositionIndex / (positions.length - 1)) * 91}%`
            : currentPositionIndex <= 38
            ? `${(currentPositionIndex / (positions.length - 1)) * 90}%`
            : currentPositionIndex <= 39
            ? `${(currentPositionIndex / (positions.length - 1)) * 90.8}%`
            : currentPositionIndex <= 40
            ? `${(currentPositionIndex / (positions.length - 1)) * 90}%`
            : currentPositionIndex <= 41
            ? `${(currentPositionIndex / (positions.length - 1)) * 89.5}%`
            : currentPositionIndex <= 42
            ? `${(currentPositionIndex / (positions.length - 1)) * 89.5}%`
            : currentPositionIndex <= 43
            ? `${(currentPositionIndex / (positions.length - 1)) * 89.5}%`
            : currentPositionIndex <= 44
            ? `${(currentPositionIndex / (positions.length - 1)) * 89.5}%`
            : currentPositionIndex <= 45
            ? `${(currentPositionIndex / (positions.length - 1)) * 89.5}%`
            : currentPositionIndex <= 46
            ? `${(currentPositionIndex / (positions.length - 1)) * 89}%`
            : currentPositionIndex <= 47
            ? `${(currentPositionIndex / (positions.length - 1)) * 89}%`
            : currentPositionIndex <= 48
            ? `${(currentPositionIndex / (positions.length - 1)) * 89}%`
            : currentPositionIndex <= 49
            ? `${(currentPositionIndex / (positions.length - 1)) * 88.5}%`
            : currentPositionIndex <= 50
            ? `${(currentPositionIndex / (positions.length - 1)) * 88.5}%`
            : currentPositionIndex <= 51
            ? `${(currentPositionIndex / (positions.length - 1)) * 88.5}%`
            : currentPositionIndex <= 52
            ? `${(currentPositionIndex / (positions.length - 1)) * 88.2}%`
            : currentPositionIndex <= 53
            ? `${(currentPositionIndex / (positions.length - 1)) * 88.2}%`
            : currentPositionIndex <= 54
            ? `${(currentPositionIndex / (positions.length - 1)) * 88.2}%`
            : currentPositionIndex <= 55
            ? `${(currentPositionIndex / (positions.length - 1)) * 88}%`
            : currentPositionIndex <= 56
            ? `${(currentPositionIndex / (positions.length - 1)) * 88}%`
            : currentPositionIndex <= 57
            ? `${(currentPositionIndex / (positions.length - 1)) * 87.8}%`
            : currentPositionIndex <= 58
            ? `${(currentPositionIndex / (positions.length - 1)) * 87.8}%`
            : currentPositionIndex <= 59
            ? `${(currentPositionIndex / (positions.length - 1)) * 87.8}%`
            : `${(currentPositionIndex / (positions.length - 1)) * 200}%`;
    };

    const addBubble = (isMovingDown) => {
        if (Math.random() > 0.5) return; // 50% chance to create a bubble
    
        const filledWaterHeight = calculateHeight();
        const filledWaterLeft = 24; 
        const filledWaterWidth = 52; 
    
        const bubbleColors = [
            "rgba(173, 216, 230, 0.2)", // Lighter blue with very low opacity
            "rgba(200, 230, 255, 0.2)", // ^
            "rgba(220, 240, 255, 0.1)", // Almost white with a hint of blue
            "rgba(240, 255, 255, 0.4)", // Light cyan
            "rgba(240, 248, 255, 0.8)", // Alice blue
        ];

        const spawnOffset = isMovingDown ? -50 : 0;
        const newBubble = {
            id: Date.now(),
            size: Math.random() * 4 + 9, 
            left: Math.random() * filledWaterWidth + filledWaterLeft, 
            bottom: `calc(${filledWaterHeight} + ${spawnOffset}px)`,
            color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)], 
            duration: isMovingDown ? 1.5 : 2, 
        };
        setBubbles((prevBubbles) => [...prevBubbles, newBubble]);
    
        setTimeout(() => {
            setBubbles((prevBubbles) => prevBubbles.filter((bubble) => bubble.id !== newBubble.id));
        }, newBubble.duration * 1000); 
    };

    useEffect(() => {
        const shuffleQuestions = () => {
            let shuffled = [...questions];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        setRandomizedQuestions(shuffleQuestions());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestionIndex]);

    // event listener for arrow keys
    useEffect(() => {
        const handleKeyDown = (event) => {
            if(event.key === 'ArrowDown'){
                setCurrentPositionIndex((prevIndex) => Math.max(0, prevIndex - 1));
                addBubble(true);
                event.preventDefault();     // prevents arrow key from scrolling page
            } else if (event.key === 'ArrowUp'){
                setCurrentPositionIndex((prevIndex) => Math.min(positions.length - 1, prevIndex + 1));
                addBubble(false);
                event.preventDefault();     // prevents arrow key from scrolling page
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, );

    const validateAnswer = () => {
        const correctAnswer = parseFloat(randomizedQuestions[currentQuestionIndex].value);
        const userAnswer = parseFloat(questions[currentPositionIndex].value);
    
        if (userAnswer === correctAnswer) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
            return;
        } else {
            setFeedback("Not quite right. Check your answer and try again!");
            setFeedbackClass('incorrect');

            setTimeout(() => {
                setFeedback('');
                setFeedbackClass('');
            }, 2000);
            return;
        }
    };

    const handleSubmitAnswer = () => {
        validateAnswer();
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setFeedback('');
            setFeedbackClass('hidden');
            setIsAnswerCorrect(false);
        }
    };

    return (
        <div className='lesson-one-point-seven'>
            <div className='questionheader'>
                <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
                <img src={require('../../assets/question/Home.png')} className='homelines' onClick={handlequestion} alt="Home Lines" />
                <div className='insideheader'><h1>ChemClicks Assignments</h1></div>
            </div>
            <div className='lesson-one-point-seven-box'>
                <div className='lesson-one-point-seven-box-title'>
                    <h1>Unit One: Uncertainty in Measurement - Tenths Value</h1>
                </div>
                <div className='lesson-one-point-seven-content'>
                    <p className='lesson-one-point-seven-prompt'>
                        Look at the graduted cylinder and use the up and down arrow keys to positon the meniscus at the given measurement. <br />
                        Hint: Make sure to measure from the bottom of the meniscus!
                    </p>
                    <div className="lesson-one-point-seven-cylinder-container">
                        <div className="lesson-one-point-seven-cylinderWaterContainer">
                            <img src={require('../../assets/question/gradCylinder.png')} className="lesson-one-point-seven-cylinder" alt="Graduated Cylinder" />
                            <div className="lesson-one-point-seven-cylinderWater" style={{ top: questions[currentPositionIndex]?.cursorPosition }}></div>

                            {/*Context: [Positionings]
                            0-9 equivalent to 0-1 on the image scale; 9-19 equivalent to 1-2 on the image scale
                            19-29 equivalent to 2-3 on the image scale; 29-39 equivalent to 3-4 on the image scale
                            39-49 equivalent to 4-5 on the image; 49-59 equivalent to 5-6 on the image */}
                            <div
                                className="lesson-seven-filledWater"
                                style={{     
                                    height: calculateHeight(),
                                }}
                                >
                            </div>
                            {bubbles.map((bubble) => (
                            <div
                                key={bubble.id}
                                className="bubble"
                                style={{
                                    width: `${bubble.size}px`,
                                    height: `${bubble.size}px`,
                                    left: `${bubble.left}%`,
                                    bottom: bubble.bottom,
                                    backgroundColor: bubble.color,
                                    animationDuration: `${bubble.duration}s`,
                                }}
                            ></div>
                            ))}
                        </div>
                    </div>

                    <hr className="separator" />
                    <div className='lesson-one-point-seven-question'>
                        <h1>Use the up and down arrow keys to show the measurement of {randomizedQuestions[currentQuestionIndex]?.value} mL.</h1>
                    </div>
                </div>

                <div className="submit-feedback-container">
                    {!isAnswerCorrect && (
                        <button className='lesson-one-point-seven-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                    )}
                    {isAnswerCorrect && (
                        <button className='lesson-one-point-seven-next' onClick={handleNextQuestion}>Next Question</button>
                    )}
                    <span className={`lesson-one-point-seven-feedback ${feedbackClass}`}>{feedback}</span>
                </div>
            </div>

            {/* Consistent for Each Question Page */}
            <div className='masterybox'>
                <div className='masteryboxtitle'><h1>Mastery</h1></div>
                <div className='masteryboxstars'>
                    <img src={require('../../assets/question/Stars.png')} className='masterystars' alt="Mastery Stars"/>
                </div>
            </div>
            <div className='goalbox'>
                <div className='goalboxtitle'><h1>Goal</h1></div>
                <div className='goalboxchecks'>
                    <img src={require('../../assets/question/Checkmarks.png')} className='goalchecks' alt="Goal Checks"/>
                </div>
            </div>
            <div className='progressbox'>
                <div className='progressboxtitle'><h1>Progress</h1>
                    <h2>Current Topic Progress: 33%</h2>
                </div>
                <div className='progressboxbar'>
                    <img src={require('../../assets/question/ProgressBar.jpg')} className='progressbar' alt="Progress Bar" />
                </div>
            </div>
        </div>
    );
}

export default LessonOnePointSeven;
