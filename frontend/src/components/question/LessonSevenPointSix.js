import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses } from './LessonUtils';

import '../../styles/question/Question.css';
import '../../styles/question/LessonSevenPointSix.css';

function LessonSevenPointSix() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId'); 
  const teacherId = localStorage.getItem('teacherId'); 
  
  const isTeacher = !!teacherId; 
  const userId = isTeacher ? teacherId : studentId;   
  const lessonId = 'lesson7.6';

  const [goal, setGoal] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [progress, setProgress] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState(0);

  const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
  const displayMedals = starsEarned >= 5;

  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const [options, setOptions] = useState([
    'The charge of an ion is equal to the group number minus 18.',
    'It does not.',
    'The charge of an ion is equal to the last digit of the group number.',
    'The charge of an ion is equal to the group number.',
    

  ]);

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

        const [nextLessonLocked, setNextLessonLocked] = useState(true);
        useEffect(() => {
            const checkNextLessonStatus = async () => {
            const nextLessonId = 'lesson7.7'; 
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


  async function handleSubmit() {
    if (selectedAnswer === '') {
      alert('Please select an answer.');
      return;
    }

    if (selectedAnswer === 'The charge of an ion is equal to the group number minus 18.') {
      setIsCorrect(true);
      await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      }); 
      setFeedbackMessage('Correct! Click done to go to the Dashboard.');
    } else {
      setIsCorrect(false);
      await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      });
      setFeedbackMessage('Incorrect. Please try again.');
    }
    setIsSubmitted(true);
  }

  function handleDone() {
    navigate('/dashboard');
  }

  function handleTryAgain() {
    setSelectedAnswer('');
    setIsSubmitted(false);
    setFeedbackMessage('');
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

  let buttonText = 'Submit Answer';
  if (isSubmitted) {
    buttonText = isCorrect ? 'Done' : 'Try Again';
  }

  function handleOptionChange(e) {
    if (isSubmitted) {
      setIsSubmitted(false);
      setFeedbackMessage('');
      setIsCorrect(null);
    }
    setSelectedAnswer(e.target.value);
  }

  return (
    <div className="LessonSevenPointSix">
      <div className="questionheader">
        <div className="question-head-in">
          <img
            src={require('../../assets/question/ChemClickLogo.png')}
            className="ChemClickLogoHeader"
            alt="Chem Click Logo"
          />
          <div className="insideheader">
            <h1>ChemClicks Assignments</h1>
          </div>
          <img
            src={require('../../assets/question/Home.png')}
            className="homelines"
            onClick={() => navigate('/dashboard')}
            alt="Home"
          />
        </div>
      </div>

      <div className="question-page-main">
        <div className="LessonSevenPointSixBox">
          <div className="LessonSevenPointSixBoxInnercont">
            <div className="LessonSevenPointSixBoxTitle">
              <h1>Unit Seven: Periodic Trends - (Predicting Monatomic Ion Charge by Group Number) - Group 14</h1>
            </div>
            <div className="LessonSevenPointSixContent">
              <p className="LessonSevenPointSixPrompt">
              How can we use the group number to predict the charge of a monatomic ion formed from an element in Group 14?              </p>
              <div className="LessonSevenPointSixRow">
                <div className="LessonSevenPointSixImageContainer">
                  <img
                    src={require('../../assets/question/Group14_Ion.png')}
                    alt="Group 14 Ion"
                    className="scrollable-image"
                  />
                </div>
                <div className="LessonSevenPointSixInput">
                  {options.map((option, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                      <input
                        type="radio"
                        id={'option-' + index}
                        name="mcq"
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={handleOptionChange}
                      />
                      <label
                        htmlFor={'option-' + index}
                        style={{ marginLeft: '10px', fontSize: '1.3rem' }}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {feedbackMessage !== '' && (
                <div className={'LessonSevenPointSixFeedback ' + (isCorrect ? 'correct' : 'incorrect')}>
                  {feedbackMessage}
                </div>
              )}
            </div>
            <div className="submit-feedback-container">
              <button className="LessonSevenPointSixSubmit" onClick={handleButtonClick}>
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
                  <div className="reward-box-left" title="Congrats on achieving mastery!">
                    🏅
                  </div>
                  <div className="reward-box-right" title="Congrats on achieving mastery!">
                    🏅
                  </div>
                </div>
              )}
              <div className="side-column-box-info masteryboxstars">{stars}</div>
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
                        className={`next-lesson-button ${nextLessonLocked ? 'locked' : ''}`} 
                        onClick={() => {
                            if (!nextLessonLocked) navigate('/lessonsevenpointseven');
                        }}
                        >
                        {nextLessonLocked ? 'Locked' : 'Next Lesson'}
                    </button>
                    </div>
        </div>
      </div>
    </div>
  );
}

export default LessonSevenPointSix;
