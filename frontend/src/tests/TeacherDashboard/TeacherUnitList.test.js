import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TeacherUnitList from '../../components/teacherdashboard/TeacherUnitList';

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/lessons/')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ name: 'Lesson 1', date_due: '2024-05-01' }),
      });
    }

    if (url.includes('/users')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ student_id: '123' }, { student_id: '456' }]),
      });
    }

    return Promise.reject(new Error('Unknown URL'));
  });
});

describe('TeacherUnitList Component', () => {
  const units = [
    {
      number: 1,
      title: 'Unit 1',
      lessons: [
        { lesson_id: 101, name: 'Lesson 1', status: 'not-started', dateDue: '2024-05-01' },
        { lesson_id: 102, name: 'Lesson 2', status: 'in-progress', dateDue: '2024-05-05' },
      ],
    },
    {
      number: 2,
      title: 'Unit 2',
      lessons: [
        { lesson_id: 201, name: 'Lesson 3', status: 'completed', dateDue: '2024-06-01' },
      ],
    },
  ];

  test('renders units and toggles lesson list', async () => {
    render(
      <BrowserRouter>
        <TeacherUnitList units={units} currentUnit={1} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Unit 1'));

    await waitFor(() => {
      expect(screen.getByText(/Lesson 1/)).toBeInTheDocument();
      expect(screen.getByText(/Lesson 2/)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Unit 1'));

    await waitFor(() => {
      expect(screen.queryByText(/Lesson 1/)).toBeNull();
      expect(screen.queryByText(/Lesson 2/)).toBeNull();
    });
  });

  test('shows edit modal when clicking the edit icon', async () => {
    render(
      <BrowserRouter>
        <TeacherUnitList units={units} currentUnit={1} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Unit 1'));

    const editIcons = screen.getAllByText('✎');
    fireEvent.click(editIcons[0]);

    await waitFor(() => {
      expect(screen.getByText('Edit Lesson')).toBeInTheDocument();
      expect(screen.getByLabelText(/Lesson Name/i)).toBeInTheDocument();
    });
  });
});
