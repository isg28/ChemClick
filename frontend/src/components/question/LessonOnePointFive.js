import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointFive.css';
import { useNavigate } from 'react-router-dom';

function LessonOnePointFive() {
    const navigate = useNavigate();

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const positions = [
        { value: "0.00", position: 0, type: "on tick" },
        { value: "0.05", position: 0.61, type: "centered" },
        { value: "0.10", position: 1.22, type: "on tick" },
        { value: "0.15", position: 2.08, type: "centered" },
        { value: "0.20", position: 2.95, type: "on tick" },
        { value: "0.25", position: 3.75, type: "centered" },
        { value: "0.30", position: 4.55, type: "on tick" },
        { value: "0.35", position: 5.4, type: "centered" },
        { value: "0.40", position: 6.25, type: "on tick" },
        { value: "0.45", position: 7.05, type: "centered" },
        { value: "0.50", position: 7.85, type: "on tick" },
        { value: "0.55", position: 8.72, type: "centered" },
        { value: "0.60", position: 9.6, type: "on tick" },
        { value: "0.65", position: 10.45, type: "centered" },
        { value: "0.70", position: 11.3, type: "on tick" },
        { value: "0.75", position: 12.11, type: "centered" },
        { value: "0.80", position: 12.92, type: "on tick" },
        { value: "0.85", position: 13.76, type: "centered" },
        { value: "0.90", position: 14.6, type: "on tick" },
        { value: "0.95", position: 15.48, type: "centered" },
        { value: "1.00", position: 16.35, type: "on tick" },
        { value: "1.05", position: 17.15, type: "centered" },
        { value: "1.10", position: 17.95, type: "on tick" },
        { value: "1.15", position: 18.8, type: "centered" },
        { value: "1.20", position: 19.65, type: "on tick" },
        { value: "1.25", position: 20.52, type: "centered" },
        { value: "1.30", position: 21.4, type: "on tick" },
        { value: "1.35", position: 22.2, type: "centered" },
        { value: "1.40", position: 23.0, type: "on tick" },
        { value: "1.45", position: 23.85, type: "centered" },
        { value: "1.50", position: 24.7, type: "on tick" },
        { value: "1.55", position: 25.55, type: "centered" },
        { value: "1.60", position: 26.4, type: "on tick" },
        { value: "1.65", position: 27.2, type: "centered" },
        { value: "1.70", position: 27.99, type: "on tick" },
        { value: "1.75", position: 28.84, type: "centered" },
        { value: "1.80", position: 29.7, type: "on tick" },
        { value: "1.85", position: 30.5, type: "centered" },
        { value: "1.90", position: 31.3, type: "on tick" },
        { value: "1.95", position: 32.17, type: "centered" },
        { value: "2.00", position: 33.05, type: "on tick" },
        { value: "2.05", position: 33.89, type: "centered" },
        { value: "2.10", position: 34.74, type: "on tick" },
        { value: "2.15", position: 35.55, type: "centered" },
        { value: "2.20", position: 36.35, type: "on tick" },
        { value: "2.25", position: 37.23, type: "centered" },
        { value: "2.30", position: 38.1, type: "on tick" },
        { value: "2.35", position: 38.97, type: "centered" },
        { value: "2.40", position: 39.83, type: "on tick" },
        { value: "2.45", position: 40.61, type: "centered" },
        { value: "2.50", position: 41.4, type: "on tick" },
        { value: "2.55", position: 42.25, type: "centered" },
        { value: "2.60", position: 43.1, type: "on tick" },
        { value: "2.65", position: 43.95, type: "centered" },
        { value: "2.70", position: 44.8, type: "on tick" },
        { value: "2.75", position: 45.61, type: "centered" },
        { value: "2.80", position: 46.42, type: "on tick" },
        { value: "2.85", position: 47.27, type: "centered" },
        { value: "2.90", position: 48.11, type: "on tick" },
        { value: "2.95", position: 48.95, type: "centered" },
        { value: "3.00", position: 49.8, type: "on tick" },
        { value: "3.05", position: 50.6, type: "centered" },
        { value: "3.10", position: 51.4, type: "on tick" },
        { value: "3.15", position: 52.29, type: "centered" },
        { value: "3.20", position: 53.18, type: "on tick" },
        { value: "3.25", position: 53.99, type: "centered" },
        { value: "3.30", position: 54.8, type: "on tick" },
        { value: "3.35", position: 55.65, type: "centered" },
        { value: "3.40", position: 56.5, type: "on tick" },
        { value: "3.45", position: 57.35, type: "centered" },
        { value: "3.50", position: 58.2, type: "on tick" },
        { value: "3.55", position: 59.0, type: "centered" },
        { value: "3.60", position: 59.8, type: "on tick" },
        { value: "3.65", position: 60.65, type: "centered" },
        { value: "3.70", position: 61.5, type: "on tick" },
        { value: "3.75", position: 62.39, type: "centered" },
        { value: "3.80", position: 63.27, type: "on tick" },
        { value: "3.85", position: 64.06, type: "centered" },
        { value: "3.90", position: 64.86, type: "on tick" },
        { value: "3.95", position: 65.73, type: "centered" },
        { value: "4.00", position: 66.6, type: "on tick" },
        { value: "4.05", position: 67.39, type: "centered" },
        { value: "4.10", position: 68.18, type: "on tick" },
        { value: "4.15", position: 69.02, type: "centered" },
        { value: "4.20", position: 69.85, type: "on tick" },
        { value: "4.25", position: 70.72, type: "centered" },
        { value: "4.30", position: 71.6, type: "on tick" },
        { value: "4.35", position: 72.4, type: "centered" },
        { value: "4.40", position: 73.2, type: "on tick" },
        { value: "4.45", position: 74.05, type: "centered" },
        { value: "4.50", position: 74.9, type: "on tick" },
        { value: "4.55", position: 75.75, type: "centered" },
        { value: "4.60", position: 76.6, type: "on tick" },
        { value: "4.65", position: 77.4, type: "centered" },
        { value: "4.70", position: 78.2, type: "on tick" },
        { value: "4.75", position: 79.1, type: "centered" },
        { value: "4.80", position: 80.0, type: "on tick" },
        { value: "4.85", position: 80.83, type: "centered" },
        { value: "4.90", position: 81.66, type: "on tick" },
        { value: "4.95", position: 82.43, type: "centered" },
        { value: "5.00", position: 83.2, type: "on tick" },
        { value: "5.05", position: 84.09, type: "centered" },
        { value: "5.10", position: 84.98, type: "on tick" },
        { value: "5.15", position: 85.79, type: "centered" },
        { value: "5.20", position: 86.6, type: "on tick" },
        { value: "5.25", position: 87.45, type: "centered" },
        { value: "5.30", position: 88.3, type: "on tick" },
        { value: "5.35", position: 89.16, type: "centered" },
        { value: "5.40", position: 90.02, type: "on tick" },
        { value: "5.45", position: 90.81, type: "centered" },
        { value: "5.50", position: 91.6, type: "on tick" },
        { value: "5.55", position: 92.47, type: "centered" },
        { value: "5.60", position: 93.33, type: "on tick" },
        { value: "5.65", position: 94.19, type: "centered" },
        { value: "5.70", position: 95.05, type: "on tick" },
        { value: "5.75", position: 95.84, type: "centered" },
        { value: "5.80", position: 96.63, type: "on tick" },
        { value: "5.85", position: 97.49, type: "centered" },
        { value: "5.90", position: 98.35, type: "on tick" },
    ];


    const questions = positions.map(pos => ({
        value: pos.value,
        positionType: pos.type,
        cursorPosition: `${pos.position}%`
    }));

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [randomizedQuestions, setRandomizedQuestions] = useState([]);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [lastDigitAttempts, setLastDigitAttempts] = useState(0);

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
    }, [currentQuestionIndex]);

    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
    };

    const validateAnswer = () => {
        const correctAnswer = parseFloat(randomizedQuestions[currentQuestionIndex].value);
        const userAnswerNum = parseFloat(userAnswer);
        const positionType = randomizedQuestions[currentQuestionIndex].positionType;

        const validFormat = /^\d\.\d{2}$/.test(userAnswer);
        if (!validFormat) {
            setFeedback("Be sure to use the correct amount of digits: #.##");
            setFeedbackClass('incorrect');
            return;
        }

        const [correctWhole, correctDecimal] = randomizedQuestions[currentQuestionIndex].value.split('.');
        const [userWhole, userDecimal] = userAnswer.split('.');

        if (userAnswerNum === correctAnswer) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
            setLastDigitAttempts(0);
            return;
        }

        if (Math.abs(userAnswerNum - correctAnswer) <= 0.05) {
            setFeedback(
                "Your answer is close, but most chemists agree there is a better answer. Try again!"
            );
            setFeedbackClass('incorrect');
            setLastDigitAttempts(0); 
            return;
        }
        
        if (userWhole === correctWhole && userDecimal !== correctDecimal) {
            const [correctTenth, correctHundredth] = correctDecimal.split('');
            const [userTenth, userHundredth] = userDecimal.split('');

            if (userTenth !== correctTenth && userHundredth === correctHundredth) {
                setFeedback("The tenths digit is incorrect. Reassess your answer carefully.");
                setFeedbackClass('incorrect');
                return;
            }
        
            if (lastDigitAttempts < 1) {
                setFeedback("The last two digits are not quite right. Double-check your answer.");
                setLastDigitAttempts(lastDigitAttempts + 1);
            } else {
                if (positionType === 'on tick') {
                    setFeedback("For on-tick measurements, the hundredths digit should be 0. Double-check your measurement.");
                } else if (positionType === 'centered') {
                    setFeedback("For measurements centered between ticks, the hundredths digit should be 5. Look closely.");
                }
            }
            setFeedbackClass('incorrect');
            return;
        }
        
        if (userWhole !== correctWhole) {
            setFeedback("The whole number is incorrect. Check the scale and try again.");
            setFeedbackClass('incorrect');
            return;
        }
        

        setFeedback("The answer is incorrect. Don't give up!");
        setFeedbackClass('incorrect');
        setLastDigitAttempts(0);

    };

    const handleSubmitAnswer = () => {
        validateAnswer();
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswer('');
            setFeedback('');
            setFeedbackClass('hidden');
            setIsAnswerCorrect(false);
        }
    };

    return (
        <div className='lesson-one-point-five'>
            <div className='questionheader'>
                <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
                <img src={require('../../assets/question/Home.png')} className='homelines' onClick={handlequestion} alt="Home Lines" />
                <div className='insideheader'><h1>ChemClick Assignments</h1></div>
            </div>
            <div className='lesson-one-point-five-box'>
                <div className='lesson-one-point-five-box-title'>
                    <h1>Unit One: Uncertainty in Measurement - Hundredths Value</h1>
                </div>
                <div className='lesson-one-point-five-content'>
                    <p className='lesson-one-point-five-prompt'>
                        Look at the cursor's position on the scale and type the measurement you think it shows.
                    </p>
                    <div className="lesson-one-point-five-ruler-container">
                        <img src={require('../../assets/question/RulerH.png')} className="lesson-one-point-five-ruler-H" alt="RulerH" />
                        <div className="lesson-one-point-five-cursor" style={{ left: randomizedQuestions[currentQuestionIndex]?.cursorPosition }}></div>
                    </div>

                    <hr className="separator" />
                    <div className='lesson-one-point-five-question'>
                        <h1>Enter the measurement shown by the cursor:</h1>
                        <input
                            type='text'
                            className='lesson-one-point-five-input'
                            placeholder='Enter the measurement here'
                            value={userAnswer}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="submit-feedback-container">
                    {!isAnswerCorrect && (
                        <button className='lesson-one-point-five-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                    )}
                    {isAnswerCorrect && (
                        <button className='lesson-one-point-five-next' onClick={handleNextQuestion}>Next Question</button>
                    )}
                    <span className={`lesson-one-point-five-feedback ${feedbackClass}`}>{feedback}</span>
                </div>
            </div>

            {/* Consistent for Each Question Page */}
            <div className='masterybox'>
                <div className='masteryboxtitle'><h1>Mastery</h1></div>
                <div className='masteryboxstars'>
                    <img src={require('../../assets/question/Stars.png')} className='masterystars' alt="Mastery Stars" />
                </div>
            </div>
            <div className='goalbox'>
                <div className='goalboxtitle'><h1>Goal</h1></div>
                <div className='goalboxchecks'>
                    <img src={require('../../assets/question/Checkmarks.png')} className='goalchecks' alt="Goal Checks" />
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

export default LessonOnePointFive;

