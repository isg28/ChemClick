// TeacherTableSearch.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TableSearch from '../../components/teacherdashboard/TeacherTableSearch';

const mockStudentStats = [
  {
    user_id: '12345',
    progress: 100,
    mastery_level: 80,
    total_attempts: 3,
    status: 'completed',
    is_late: false
  }
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => mockStudentStats
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders student data table', async () => {
  render(
    <MemoryRouter initialEntries={['/lesson/1']}>
      <Routes>
        <Route path="/lesson/:lessonId" element={<TableSearch />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Student Data/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('100.00%')).toBeInTheDocument();
    expect(screen.getByText('80.00%')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
    expect(screen.getByText(/No/i)).toBeInTheDocument();
  });
});
