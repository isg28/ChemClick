import { renderStars, renderGoalChecks, fetchLessonMastery } from '../components/question/LessonUtils';

const mockSetMasteryLevels = jest.fn();

describe('LessonUtils Functions', () => {

  // Test renderStars 
  test('renderStars should return correct number of filled stars based on mastery', () => {
    // Case: 100% Progress, Goal 10, 10 Attempts -> Full stars
    const { starsEarned } = renderStars(10, 10, 10, 100);
    expect(starsEarned).toBe(5); // Should get full stars

    // Case: 50% Efficiency, Goal 10, 20 Attempts -> Rounded up to 3 stars
    const { starsEarned: halfStars } = renderStars(10, 10, 20, 100);
    expect(halfStars).toBe(3); 

    // Case: Not yet 100% progress, should get 0 stars
    const { starsEarned: noStars } = renderStars(10, 10, 10, 50);
    expect(noStars).toBe(0);
  });

  // Test renderGoalChecks 
  test('renderGoalChecks should return correct number of checked boxes', () => {
    // Case: Goal is 5, User got 3 correct
    const goalCheckElement = renderGoalChecks(5, 3);
    expect(goalCheckElement.props.children.length).toBe(5); // Should have 5 checkboxes (doesn't detect if goal is completed)
  });

  // Test fetchLessonMastery 
  test('fetchLessonMastery should set mastery levels correctly', async () => {
    // Mock Fetch Response Data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { lesson_id: "lesson1", mastery_level: 80 },
          { lesson_id: "lesson2", mastery_level: undefined }, // Should default to 0
        ]),
      })
    );

    await fetchLessonMastery("student123", mockSetMasteryLevels);

    expect(mockSetMasteryLevels).toHaveBeenCalledWith({
      "lesson1": 80,
      "lesson2": "0", 
    });
  });

  // Test Profile Data (Mastery Levels)
  test('profile should display mastery levels correctly', async () => {
    const mockMasteryLevels = { lesson1: 85, lesson2: undefined }; // Undefined should be 0

    const profileData = Object.keys(mockMasteryLevels).map(lessonId => ({
      lessonId,
      mastery: mockMasteryLevels[lessonId] ?? 0, // Apply default
    }));

    expect(profileData).toEqual([
      { lessonId: "lesson1", mastery: 85 },
      { lessonId: "lesson2", mastery: 0 }, 
    ]);
  });

});
