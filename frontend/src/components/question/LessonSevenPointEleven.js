import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses,} from './LessonUtils';

import '../../styles/question/Question.css';
import '../../styles/question/LessonSevenPointEleven.css';

function LessonSevenPointEleven() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId');
  const teacherId = localStorage.getItem('teacherId');

  const isTeacher = !!teacherId;
  const userId = isTeacher ? teacherId : studentId;
  const lessonId = 'lesson7.11';

  const [goal, setGoal] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [progress, setProgress] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState(0);

  const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
  const displayMedals = starsEarned >= 5;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const [firstChoice, setFirstChoice] = useState('');
  const [secondChoice, setSecondChoice] = useState('');
  const [thirdChoice, setThirdChoice] = useState('');

  const firstDropdownOptions = [
    'Equal to the group number',
    'Equal to the last digit of the group number',
    'Equal to the group number minus 18',
    'It cannot',
  ];

  const secondDropdownOptions = ['hydrogen', 'lithium', 'beryllium', 'helium'];
  const thirdDropdownOptions = ['2-', '1-', '0', '1+', '2+'];

  useEffect(() => {
    if (!userId) {
      console.error('ID not found');
      navigate('/login');
      return;
    }

    const initializeData = async () => {
      await fetchLessonData(lessonId, setGoal);
      await fetchLessonProgress(userId, lessonId, isTeacher, {setCorrectAnswers, setIncorrectAnswers, setProgress, setMasteryLevel, setGoal, setTotalAttempts,});
    };

    initializeData();
  }, [userId, lessonId, navigate, isTeacher]);

  async function handleSubmit() {
    if (!firstChoice || !secondChoice || !thirdChoice) {
      setIsCorrect(false);
      setFeedbackMessage('Make sure all of the sections are filled.');
      setIsSubmitted(true);
      return;
    }

    const isAnswerCorrect =
      firstChoice === 'Equal to the group number' &&
      secondChoice === 'hydrogen' &&
      thirdChoice === '1-';

    if (isAnswerCorrect) {
      setIsCorrect(true);
      await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      });
      setFeedbackMessage('Correct! Click done to go to the Dashboard.');
    } else {
      setIsCorrect(false);
      await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      });
      setFeedbackMessage('Incorrect. Please try again.');
    }

    setIsSubmitted(true);
  }

  function handleDone() {
    navigate('/dashboard');
  }

  function handleTryAgain() {
    setIsSubmitted(false);
    setFeedbackMessage('');
    setIsCorrect(null);
  }

  function handleButtonClick() {
    if (!isSubmitted) {
      handleSubmit();
    } else {
      isCorrect ? handleDone() : handleTryAgain();
    }
  }

  const buttonText = isSubmitted ? (isCorrect ? 'Done' : 'Try Again') : 'Submit Answer';

  return (
    <div className="LessonSevenPointEleven">
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
        <div className="LessonSevenPointElevenBox">
          <div className="LessonSevenPointElevenBoxInnercont">
            <div className="LessonSevenPointElevenBoxTitle">
              <h1>
                Unit Eleven: Periodic Trends - (Predicting Monatomic Ion Charge by Group Number) - Left Side
              </h1>
            </div>
            <div className="LessonSevenPointElevenContent">
              <p className="LessonSevenPointElevenPrompt">
                Complete the following sentence using drop-down selections.
              </p>
              <div className="LessonSevenPointElevenRow">
                <div className="LessonSevenPointElevenImageContainer">
                  <div style={{ fontSize: '1.3rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                      Your answers to Group 1 and Group 2:
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <span>Group 1 (All elements shown):</span> Selected "Equal to the group number."
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <span>Group 1 (Hydrogen faded):</span> Selected "Equal to the group number."
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <span>Group 1 (Only hydrogen visible):</span> Selected "It cannot."
                    </div>
                    <div>
                      <span>Group 2:</span> Selected "Equal to the group number."
                    </div>
                  </div>
                </div>
                <div className="LessonSevenPointElevenInput">
                  <div className="LessonSevenPointElevenSentence">
                    On the left side of the periodic table, the charge of an ion derived from an element is{' '}
                    <select value={firstChoice} onChange={(e) => setFirstChoice(e.target.value)}>
                      <option value="">--Select--</option>
                      {firstDropdownOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>{' '}
                    except for{' '}
                    <select value={secondChoice} onChange={(e) => setSecondChoice(e.target.value)}>
                      <option value="">--Select--</option>
                      {secondDropdownOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>{' '}
                    because its ion has a charge of{' '}
                    <select value={thirdChoice} onChange={(e) => setThirdChoice(e.target.value)}>
                      <option value="">--Select--</option>
                      {thirdDropdownOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>.
                  </div>
                </div>
              </div>
              {feedbackMessage && (
                <div
                  className={'LessonSevenPointElevenFeedback ' + (isCorrect ? 'correct' : 'incorrect')}
                >
                  {feedbackMessage}
                </div>
              )}
            </div>
            <div className="submit-feedback-container">
              <button className="LessonSevenPointElevenSubmit" onClick={handleButtonClick}>
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
                  <div className="reward-box-left" title="Congrats on achieving mastery!">🏅</div>
                  <div className="reward-box-right" title="Congrats on achieving mastery!">🏅</div>
                </div>
              )}
              <div className="side-column-box-info masteryboxstars">{stars}</div>
            </div>
            <div className="side-column-box">
              <div className="side-column-box-title"><h1>Goal</h1></div>
              <div className="side-column-box-info">{renderGoalChecks(goal, correctAnswers)}</div>
            </div>
          </div>
          {/* Next Lesson button positioned below the Goals box */}
          <div className="next-lesson-button-container" style={{ marginTop: '20px' }}>
                        <button 
                            className="next-lesson-button" 
                            onClick={() => navigate('/lessonsevenpointtwelve')}
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

export default LessonSevenPointEleven;
