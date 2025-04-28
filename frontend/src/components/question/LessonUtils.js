// Utilities/functions for rendering stars, checks, and handling lesson data
// Needs to be included in every lesson 

export const renderStars = (goal, correctAnswers, totalAttempts, progress) => {
    const totalStars = 5;
    const efficiency  = progress >= 100 ? goal / totalAttempts : 0;
    const starsEarned = Math.round(efficiency  * totalStars);

    const stars = Array.from({ length: totalStars }, (_, i) => (
        <span key={i} className={progress >= 100 && i < starsEarned ? 'filled-star' : 'empty-star'}>★</span>
    ));
    return { starsEarned, stars };
};

export const renderGoalChecks = (goal, correctAnswers) => {
    const checks = Array.from({ length: goal }, (_, i) => (
        <span key={i} className={i < correctAnswers ? 'checked-box' : 'unchecked-box'}>✔</span>
    ));

    if (goal === 10) {
        return <div className="goalboxchecks goalboxchecks-ten">{checks}</div>;
    } else if (goal > 10) {
        const rows = [
            <div className="goalbox-row" key="row1">
                {checks.slice(0, 10)}
            </div>,
            <div className="goalbox-row" key="row2">
                {checks.slice(10)}
            </div>,
        ];
        return <div className="goalboxchecks goalboxchecks-large">{rows}</div>;
    } else {
        return <div className="goalboxchecks goalboxchecks-single-row">{checks}</div>;
    }
};        

export const fetchLessonData = async (lessonId, setGoal) => {
    const headers = { 'Content-Type': 'application/json' };

    try {
        const isLocal = window.location.hostname.includes('localhost');
 
        const BASE_URL = isLocal
        ? 'http://localhost:8000'
        : 'https://chemclick.onrender.com'
        
        const response = await fetch(`${BASE_URL}/lessons/`, { method: 'GET', headers });
        if (!response.ok) throw new Error(`Failed to fetch lesson data: ${response.status} ${response.statusText}`);
        
        const data = await response.json();

        const lessonData = data.find((lesson) => lesson.lesson_id === lessonId);
        if (lessonData) {
            setGoal(Number(lessonData.goal_level));
            //const unitNumber = lessonData.lesson_id.match(/lesson(\d+)/)?.[1];   // To allow dynamic name changes 
            //setUnit(unitNumber || 'Unknown'); 
            //setLessonName(lessonData.name);
            return lessonData.goal_level; 
        } else {
            console.warn(`Lesson ${lessonId} not found.`);
        }
    } catch (error) {
        console.error('Error fetching lesson data:', error);
    } 
};

export const fetchLessonProgress = async (userId, lessonId, isTeacher, setProgressState) => {
    const { setCorrectAnswers, setIncorrectAnswers, setTotalAttempts, setProgress, setMasteryLevel, setGoal } = setProgressState;

    try {
        // Fetch the current lesson goal from the teacher's settings
        const isLocal = window.location.hostname.includes('localhost');
 
        const BASE_URL = isLocal
        ? 'http://localhost:8000'
        : 'https://chemclick.onrender.com'
        const lessonDataResponse = await fetch(`${BASE_URL}/lessons/${lessonId}`);
        if (!lessonDataResponse.ok) {
            console.error('Failed to fetch lesson data.');
            return;
        }
        const lessonData = await lessonDataResponse.json();
        const teacherGoalLevel = lessonData.goal_level;

        
        const progressEndpoint = isTeacher
            ? `${BASE_URL}/teacherLessons/progress/${userId}/${lessonId}/`
            : `${BASE_URL}/lessons/progress/${userId}/${lessonId}/`;

        
        const progressResponse = await fetch(progressEndpoint);
        if (progressResponse.ok) {
            const progressData = await progressResponse.json();
            const currentGoalLevel = progressData.goal_level;

            if (teacherGoalLevel !== currentGoalLevel) {
                if (teacherGoalLevel < progressData.correct_answers && progressData.correct_answers !== 0) {
                    // Solution if the teacher reduces the goal level, and it conflicts with student's current progress
                    const adjustedProgress = Math.min((progressData.correct_answers / teacherGoalLevel) * 100, 100);
                    const updatedProgressPayload = {
                        correct_answers: progressData.correct_answers,
                        total_attempts: progressData.total_attempts || 0,
                        progress: adjustedProgress,
                        goal_level: teacherGoalLevel,
                        mastery_level: 0, 
                    };

                    await fetch(progressEndpoint, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedProgressPayload),
                    });

                    setCorrectAnswers(updatedProgressPayload.correct_answers);
                    setTotalAttempts(updatedProgressPayload.total_attempts);
                    setProgress(updatedProgressPayload.progress);
                    setMasteryLevel(updatedProgressPayload.mastery_level);
                } else if (teacherGoalLevel > currentGoalLevel) {
                    // When the teacher increases the goal level
                    const adjustedProgress = Math.min((progressData.correct_answers / teacherGoalLevel) * 100, 100);
                    const updatedProgressPayload = {
                        correct_answers: progressData.correct_answers,
                        total_attempts: progressData.total_attempts || 0,
                        progress: adjustedProgress,
                        goal_level: teacherGoalLevel,
                        mastery_level: 0, // Reset mastery level when goal increases
                    };

                    await fetch(progressEndpoint, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedProgressPayload),
                    });
                    setCorrectAnswers(updatedProgressPayload.correct_answers);
                    setTotalAttempts(updatedProgressPayload.total_attempts);
                    setProgress(updatedProgressPayload.progress);
                    setMasteryLevel(updatedProgressPayload.mastery_level);
                } else {
                    // Reset progress for any other scenario where the goal level decreases
                    const resetProgressPayload = {
                        correct_answers: 0,
                        progress: 0,
                        mastery_level: 0,
                        goal_level: teacherGoalLevel,
                    };

                    await fetch(progressEndpoint, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(resetProgressPayload),
                    });

                    setCorrectAnswers(0);
                    setProgress(0);
                    setMasteryLevel(0);
                }
            } else {
                // If goal levels match, use the existing progress data
                setIncorrectAnswers(progressData.incorrect_answers || 0);
                setCorrectAnswers(progressData.correct_answers || 0);
                setTotalAttempts(progressData.total_attempts || 0);
                setProgress(progressData.progress || 0);
                setMasteryLevel(progressData.mastery_level || 0);
            }

            setGoal(teacherGoalLevel);
            return progressData
        } else if (progressResponse.status === 404) {
            console.warn('Progress not found. Creating a new entry.');

            const newProgressPayload = {
                [isTeacher ? 'teacher_id' : 'user_id']: userId,
                lesson_id: lessonId,
                correct_answers: 0,
                incorrect_answers: 0,
                total_attempts: 0,
                mastery_level: 0,
                progress: 0,
                goal_level: teacherGoalLevel,
            };
        const isLocal = window.location.hostname.includes('localhost');
 
        const BASE_URL = isLocal
        ? 'http://localhost:8000'
        : 'https://chemclick.onrender.com'
            const postUrl = isTeacher
                ? `${BASE_URL}/teacherLessons/progress/`
                : `${BASE_URL}/lessons/progress/`;

            const postResponse = await fetch(postUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProgressPayload),
            });

            if (postResponse.ok) {
                console.log('Progress created successfully');
                setCorrectAnswers(0);
                setIncorrectAnswers(0);
                setProgress(0);
                setMasteryLevel(0);
                setGoal(teacherGoalLevel);
            } else {
                const errorData = await postResponse.json();
                console.error('Failed to create progress:', errorData);
            }
    }else {
            console.error('Failed to fetch progress:', progressResponse.status);
        }
    } catch (error) {
        console.error('Error fetching lesson progress:', error);
    }
};

export const fetchLessonMastery = async (userId, isTeacher, setUserMastery) => {
    try {
        const isLocal = window.location.hostname.includes('localhost');
 
        const BASE_URL = isLocal
        ? 'http://localhost:8000'
        : 'https://chemclick.onrender.com'

        const url = isTeacher
            ? `${BASE_URL}/teacherLessons/progress/${userId}/`
            : `${BASE_URL}/lessons/progress/${userId}/`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch mastery levels: ${response.status}`);
        }

        const data = await response.json();

        // Convert response data into an object with lesson_id as the key
        const masteryMap = data.reduce((acc, lesson) => {
            acc[lesson.lesson_id] = lesson.mastery_level || '0';
            return acc;
        }, {});

        setUserMastery(masteryMap);
    } catch (error) {
        console.error("Error fetching mastery levels:", error);
        setUserMastery({}); // Set empty object if error occurs
    }
};

export const createLessonProgress = async (userId, isTeacher, lessonId, goal) => {
    const payload = {
        user_id: userId,
        lesson_id: lessonId,
        correct_answers: 0,
        incorrect_answers: 0,
        mastery_level: 0.0,
        progress: 0.0,
        goal_level: goal, 
    };

    const isLocal = window.location.hostname.includes('localhost');
 
    const BASE_URL = isLocal
      ? 'http://localhost:8000'
      : 'https://chemclick.onrender.com'

    const url = isTeacher
        ? `${BASE_URL}/teacherLessons/progress/`
        : `${BASE_URL}/lessons/progress/`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log('Lesson progress created successfully');
        } else {
            const errorData = await response.json();
            console.error('Failed to create lesson progress:', errorData);
        }
    } catch (error) {
        console.error('Error creating lesson progress:', error);
    }
};

export const decreaseProgressAndGoal = async (userId, isTeacher, lessonId, correctAnswers, progress, masteryLevel, goal, setProgressState) => {

    const { setCorrectAnswers, setProgress } = setProgressState;
    const newCorrectAnswers = Math.max(correctAnswers - 1, 0); 
    const newProgress = Math.max(progress - (100 / goal), 0); 

    const payload = {
        correct_answers: newCorrectAnswers,
        progress: newProgress,
        mastery_level: masteryLevel, 
    };

    const isLocal = window.location.hostname.includes('localhost');
 
    const BASE_URL = isLocal
      ? 'http://localhost:8000'
      : 'https://chemclick.onrender.com'

    const progressEndpoint = isTeacher
        ? `${BASE_URL}/teacherLessons/progress/${userId}/${lessonId}/`
        : `${BASE_URL}/lessons/progress/${userId}/${lessonId}/`;

    try {
        const response = await fetch(progressEndpoint, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const updatedProgress = await response.json();
            setCorrectAnswers(updatedProgress.correct_answers);
            setProgress(updatedProgress.progress);
        } else {
            const errorData = await response.json();
            console.error('Failed to update progress for incorrect answer:', errorData);
        }
    } catch (error) {
        console.error('Error updating progress for incorrect answer:', error);
    }
};

export const CorrectResponses = async ({
    userId,
    isTeacher,
    lessonId,
    correctAnswers,
    incorrectAnswers,
    totalAttempts, 
    goal,
    progress,
    setCorrectAnswers,
    setTotalAttempts,
    setProgress,
    setMasteryLevel,
}) => {
    if (progress === 100) {
        return;
    }

    const newCorrectAnswers = correctAnswers + 1;
    const newTotalAttempts = (totalAttempts || 0) + 1;
    const newProgress = Math.min((newCorrectAnswers / goal) * 100, 100);
    const newMasteryLevel = newProgress === 100 ? Math.round((newCorrectAnswers / newTotalAttempts) * 100) : 0;


    const isLocal = window.location.hostname.includes('localhost');
 
    const BASE_URL = isLocal
      ? 'http://localhost:8000'
      : 'https://chemclick.onrender.com'

    const progressEndpoint = isTeacher
        ? `${BASE_URL}/teacherLessons/progress/${userId}/${lessonId}/`
        : `${BASE_URL}/lessons/progress/${userId}/${lessonId}/`;


    const payload = {
        correct_answers: newCorrectAnswers,
        total_attempts: newTotalAttempts, 
        progress: newProgress,
        mastery_level: newMasteryLevel,
    };

    try {
        const response = await fetch(progressEndpoint, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const updatedProgress = await response.json();
            setCorrectAnswers(updatedProgress.correct_answers);
            setTotalAttempts(updatedProgress.total_attempts);
            setProgress(updatedProgress.progress);
            setMasteryLevel(updatedProgress.mastery_level);
        }
    } catch (error) {
        console.error('Error updating progress:', error);
    }
};

export const IncorrectResponses = async ({
    userId,
    isTeacher,
    lessonId,
    correctAnswers,
    incorrectAnswers,
    totalAttempts, 
    goal,
    progress,
    setIncorrectAnswers,
    setTotalAttempts,
    setProgress,
    setMasteryLevel,
}) => {
    if (progress === 100) {
        return;
    }
    const newIncorrectAnswers = incorrectAnswers + 1;
    const newTotalAttempts = totalAttempts + 1; 
    const newProgress = Math.min((correctAnswers / goal) * 100, 100);
    const newMasteryLevel = newProgress === 100 ? Math.round((correctAnswers / newTotalAttempts) * 100) : 0;

    const isLocal = window.location.hostname.includes('localhost');
 
    const BASE_URL = isLocal
      ? 'http://localhost:8000'
      : 'https://chemclick.onrender.com'

    const progressEndpoint = isTeacher
        ? `${BASE_URL}/teacherLessons/progress/${userId}/${lessonId}/`
        : `${BASE_URL}/lessons/progress/${userId}/${lessonId}/`;

    const payload = {
        incorrect_answers: newIncorrectAnswers,
        total_attempts: newTotalAttempts,
        progress: newProgress,
        mastery_level: newMasteryLevel,
    };

    try {
        const response = await fetch(progressEndpoint, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const updatedProgress = await response.json();
            setIncorrectAnswers(updatedProgress.incorrect_answers);
            setTotalAttempts(updatedProgress.total_attempts);
            setProgress(updatedProgress.progress);
            setMasteryLevel(updatedProgress.mastery_level);
        }
    } catch (error) {
        console.error('Error updating incorrect answers:', error);
    }
};

export const fetchUpdatedLessonProgress = async (userId, lessonId, isTeacher) => {
    const isLocal = window.location.hostname.includes('localhost');
 
    const BASE_URL = isLocal
      ? 'http://localhost:8000'
      : 'https://chemclick.onrender.com'
    
    const progressEndpoint = isTeacher
        ? `${BASE_URL}/teacherLessons/progress/${userId}/${lessonId}/`
        : `${BASE_URL}/lessons/progress/${userId}/${lessonId}/`;

    

    try {
        const response = await fetch(progressEndpoint);
        if (!response.ok) {
            return null;
        }

        const progressData = await response.json();
        return progressData;
    } catch (error) {
        return null;
    }
};
