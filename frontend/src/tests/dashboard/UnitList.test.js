import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UnitList from '../../components/dashboard/UnitList';

// Mock the fetchUpdatedLessonProgress function used in the component
jest.mock('../../components/question/LessonUtils', () => ({
  fetchUpdatedLessonProgress: jest.fn().mockResolvedValue({ completion_timestamp: '2025-04-13T10:00:00Z', is_late: false })
}));

describe('UnitList Component', () => {
  const units = [
    {
      number: 1,
      title: 'Unit 1',
      lessons: [
        { lesson_id: 101, name: 'Lesson 1', status: 'not-started', route: '/lesson/101' },
        { lesson_id: 102, name: 'Lesson 2', status: 'in-progress', route: '/lesson/102' },
      ],
    },
    {
      number: 2,
      title: 'Unit 2',
      lessons: [
        { lesson_id: 201, name: 'Lesson 3', status: 'completed', route: '/lesson/201' },
        { lesson_id: 202, name: 'Lesson 4', status: 'locked', route: '/lesson/202' },
      ],
    },
  ];

  test('renders units and lessons', async () => {
    render(<UnitList units={units} currentUnit={1} onLessonClick={jest.fn()} progressData={{}} userId={1} isTeacher={false} />);

    // Test if the units are displayed correctly
    expect(screen.getByText('Unit 1')).toBeInTheDocument();
    expect(screen.getByText('Unit 2')).toBeInTheDocument();
    
    // Get unit title and click to reveal lessons
    const unitTitle = screen.getByText('Unit 1');
    fireEvent.click(unitTitle); // Simulate expanding unit 1
    
    // Wait for the lessons to be rendered after expanding the unit
    await waitFor(() => {
      // Now check for lessons in the expanded unit
      expect(screen.getByText(/Lesson 1/)).toBeInTheDocument();
      expect(screen.getByText(/Lesson 2/)).toBeInTheDocument();
    });
  });

  test('toggles unit details when clicked', async () => {
    render(<UnitList units={units} currentUnit={1} onLessonClick={jest.fn()} progressData={{}} userId={1} isTeacher={false} />);

    const unitTitle = screen.getByText('Unit 1');
    fireEvent.click(unitTitle); // Expand unit details

    // After click, unit details should be visible
    await waitFor(() => {
      expect(screen.getByText(/Lesson 1/)).toBeInTheDocument();
      expect(screen.getByText(/Lesson 2/)).toBeInTheDocument();
    });

    fireEvent.click(unitTitle); // Collapse unit details

    // After click again, unit details should be hidden
    await waitFor(() => {
      expect(screen.queryByText(/Lesson 1/)).toBeNull();
      expect(screen.queryByText(/Lesson 2/)).toBeNull();
    });
  });
});
