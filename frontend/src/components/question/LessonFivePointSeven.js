import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';


import '../../styles/question/Question.css';
import '../../styles/question/LessonFivePointSeven.css';

function LessonFivePointSeven() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId');
  const lessonId = 'lesson5.7';

  const [goal, setGoal] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [progress, setProgress] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState(0);

  const { starsEarned, stars } = renderStars(masteryLevel);
  const displayMedals = starsEarned >= 5;  

  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    'The number of valence electrons is equal to the group number.',
    'The number of valence electrons is equal to the last digit of the group number.',
    'It is not.',
  ];



  useEffect(() => {
    if (!studentId) {
      console.error('Student ID not found');
      navigate('/login');
      return;
    }

    async function initializeData() {
      await fetchLessonData(lessonId, setGoal);
      await fetchLessonProgress(studentId, lessonId, {
        setCorrectAnswers: setCorrectAnswers,
        setProgress: setProgress,
        setMasteryLevel: setMasteryLevel,
        setGoal: setGoal,
      });
    }
    initializeData();
  }, [studentId, lessonId, navigate]);

  async function handleSubmit() {
    if (selectedAnswer === '') {
      alert('Please select an answer.');
      return;
    }

    if (selectedAnswer === 'The number of valence electrons is equal to the last digit of the group number.') {
      setIsCorrect(true);
      await CorrectResponses({
        studentId, 
        lessonId, 
        correctAnswers, 
        progress, 
        masteryLevel, 
        goal,
        starsEarned, 
        setCorrectAnswers, 
        setProgress, 
        setMasteryLevel,
}); 
      setFeedbackMessage('Correct! Click done to go to the Dashboard.');
    } else {
      setIsCorrect(false);
      await IncorrectResponses({
        studentId, 
        lessonId, 
        correctAnswers, 
        progress, 
        masteryLevel, 
        goal, 
        starsEarned, 
        setCorrectAnswers, 
        setProgress, 
        setMasteryLevel,
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
    if (isCorrect) {
      buttonText = 'Done';
    } else {
      buttonText = 'Try Again';
    }
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
    <div className="LessonFivePointSeven">
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
        <div className="LessonFivePointSevenBox">
          <div className="LessonFivePointSevenBoxInnercont">
            <div className="LessonFivePointSevenBoxTitle">
              <h1>Unit Five: Periodic Trends (Valence Electrons) - Group 17</h1>
            </div>
            <div className="LessonFivePointSevenContent">
              <p className="LessonFivePointSevenPrompt">
              How does Group 17's group number relate to its valence electrons?</p>
              <div className="LessonFivePointSevenRow">
                <div className="LessonFivePointSevenImageContainer">
                  <img
                    src={require('../../assets/question/Group17.png')}
                    alt="Group 17"
                    className="scrollable-image"
                  />
                </div>
                <div className="LessonFivePointSevenInput">
                  {options.map(function (option, index) {
                    return (
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
                    );
                  })}
                </div>
              </div>
              {feedbackMessage !== '' && (
                <div className={'LessonFivePointSevenFeedback ' + (isCorrect ? 'correct' : 'incorrect')}>
                  {feedbackMessage}
                </div>
              )}
            </div>
            <div className="submit-feedback-container">
              <button className="LessonFivePointSevenSubmit" onClick={handleButtonClick}>
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
            <div className="side-column-box">
              <div className="side-column-box-title">
                <h1>Progress</h1>
              </div>
              <div className="side-column-box-info">
                <div className="progressbox">
                  <div className="progressbar" style={{ '--progress': progress }}></div>
                  <div className="progress-text">Current Topic Progress: {progress.toFixed(2)}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonFivePointSeven;