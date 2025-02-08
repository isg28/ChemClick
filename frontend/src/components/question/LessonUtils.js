// Utilities/functions for rendering stars, checks, and handling lesson data
// Needs to be included in every lesson 

export const renderStars = (masteryLevel) => {
    const totalStars = 5;
    const starsEarned = Math.min(Math.floor(masteryLevel / 10), totalStars); 
    const stars = Array.from({ length: totalStars }, (_, i) => (
        <span key={i} className={i < starsEarned ? 'filled-star' : 'empty-star'}>★</span>
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
    const url = `http://localhost:8000/lessons/`;
    const headers = { 'Content-Type': 'application/json' };

    try {
        const response = await fetch(url, { method: 'GET', headers });
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

export const fetchLessonProgress = async (studentId, lessonId, setProgressState) => {
    const { setCorrectAnswers, setProgress, setMasteryLevel, setGoal } = setProgressState;

    try {
        // Fetch the current lesson goal from the teacher's settings
        const lessonDataResponse = await fetch(`http://localhost:8000/lessons/${lessonId}`);
        if (!lessonDataResponse.ok) {
            console.error('Failed to fetch lesson data.');
            return;
        }
        const lessonData = await lessonDataResponse.json();
        const teacherGoalLevel = lessonData.goal_level;

        // Fetch the student's progress
        const progressResponse = await fetch(`http://localhost:8000/lessons/progress/${studentId}/${lessonId}`);
        if (progressResponse.ok) {
            const progressData = await progressResponse.json();
            const currentGoalLevel = progressData.goal_level;

            if (teacherGoalLevel !== currentGoalLevel) {
                if (teacherGoalLevel < progressData.correct_answers && progressData.correct_answers !== 0) {
                    // Solution if the teacher reduces the goal level, and it conflicts with student's current progress
                    const adjustedProgress = Math.min((progressData.correct_answers / teacherGoalLevel) * 100, 100);
                    const updatedProgressPayload = {
                        correct_answers: progressData.correct_answers,
                        progress: adjustedProgress,
                        goal_level: teacherGoalLevel,
                        mastery_level: 0, 
                    };

                    await fetch(`http://localhost:8000/lessons/progress/${studentId}/${lessonId}/`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedProgressPayload),
                    });

                    setCorrectAnswers(updatedProgressPayload.correct_answers);
                    setProgress(updatedProgressPayload.progress);
                    setMasteryLevel(updatedProgressPayload.mastery_level);
                } else if (teacherGoalLevel > currentGoalLevel) {
                    // When the teacher increases the goal level
                    const adjustedProgress = Math.min((progressData.correct_answers / teacherGoalLevel) * 100, 100);
                    const updatedProgressPayload = {
                        correct_answers: progressData.correct_answers,
                        progress: adjustedProgress,
                        goal_level: teacherGoalLevel,
                        mastery_level: 0, // Reset mastery level when goal increases
                    };

                    await fetch(`http://localhost:8000/lessons/progress/${studentId}/${lessonId}/`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedProgressPayload),
                    });
                    setCorrectAnswers(updatedProgressPayload.correct_answers);
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

                    await fetch(`http://localhost:8000/lessons/progress/${studentId}/${lessonId}/`, {
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
                setCorrectAnswers(progressData.correct_answers || 0);
                setProgress(progressData.progress || 0);
                setMasteryLevel(progressData.mastery_level || 0);
            }

            setGoal(teacherGoalLevel);
        } else if (progressResponse.status === 404) {
            console.warn('Progress not found. Creating a new entry.');

            // Create new progress entry based on the teacher's goal level
            const newProgressPayload = {
                user_id: studentId,
                lesson_id: lessonId,
                correct_answers: 0,
                incorrect_answers: 0,
                mastery_level: 0,
                progress: 0,
                goal_level: teacherGoalLevel,
            };

            await fetch('http://localhost:8000/lessons/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProgressPayload),
            });

            setCorrectAnswers(0);
            setProgress(0);
            setMasteryLevel(0);
            setGoal(teacherGoalLevel);
        } else {
            console.error('Failed to fetch progress:', progressResponse.status);
        }
    } catch (error) {
        console.error('Error fetching lesson progress:', error);
    }
};

export const fetchLessonMastery = async (studentId, setUserMastery) => {
    try {
        const response = await fetch(`http://localhost:8000/lessons/progress/${studentId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch mastery levels");
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




export const createLessonProgress = async ( studentId, lessonId, goal ) => {
    const payload = {
        user_id: studentId,
        lesson_id: lessonId,
        correct_answers: 0,
        incorrect_answers: 0,
        mastery_level: 0.0,
        progress: 0.0,
        goal_level: goal, 
    };
    try {
        const response = await fetch('http://localhost:8000/lessons/progress', {
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

export const decreaseProgressAndGoal = async (studentId, lessonId, correctAnswers, progress, masteryLevel, goal, setProgressState) => {
    const { setCorrectAnswers, setProgress } = setProgressState;
    const newCorrectAnswers = Math.max(correctAnswers - 1, 0); 
    const newProgress = Math.max(progress - (100 / goal), 0); 

    const payload = {
        correct_answers: newCorrectAnswers,
        progress: newProgress,
        mastery_level: masteryLevel, 
    };
    try {
        const response = await fetch(`http://localhost:8000/lessons/progress/${studentId}/${lessonId}/`, {
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
}) => {
    const newCorrectAnswers = correctAnswers + 1;
    const newProgress = Math.min((newCorrectAnswers / goal) * 100, 100);

    let newMasteryLevel = masteryLevel;
    if (newProgress === 100 && starsEarned < 5) {
        newMasteryLevel = Math.min(masteryLevel + 10, 100);
    }

    const payload = {
        correct_answers: newCorrectAnswers,
        progress: newProgress,
        mastery_level: newMasteryLevel,
        goal_level: goal,
    };

    try {
        const response = await fetch(
            `http://localhost:8000/lessons/progress/${studentId}/${lessonId}/`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        );

        if (response.ok) {
            const updatedProgress = await response.json();
            setCorrectAnswers(updatedProgress.correct_answers);
            setProgress(updatedProgress.progress);
            setMasteryLevel(updatedProgress.mastery_level);
        }
    } catch (error) {
        console.error('Error updating progress:', error);
    }
};

export const IncorrectResponses = async ({
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
}) => {
    if (progress < 100 && masteryLevel <= 50) {
        await decreaseProgressAndGoal(studentId, lessonId, correctAnswers, progress, masteryLevel, goal, {
            setCorrectAnswers,
            setProgress,
        });
    } else if (progress === 100 && starsEarned !== 5) {
        const newMasteryLevel = Math.max(masteryLevel - 10, 10);
        const payload = {
            mastery_level: newMasteryLevel,
        };

        try {
            const response = await fetch(
                `http://localhost:8000/lessons/progress/${studentId}/${lessonId}/`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }
            );
            if (response.ok) {
                const updatedProgress = await response.json();
                setMasteryLevel(updatedProgress.mastery_level);
            } else {
                const errorData = await response.json();
                console.error('Failed to update mastery level:', errorData);
            }
        } catch (error) {
            console.error('Error updating mastery level:', error);
        }
    }
};
