import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../../components/dashboard/Dashboard';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  localStorage.setItem('studentId', '123');  // Set a mock student ID in localStorage
});

describe('Dashboard Component', () => {
  test('renders loading state and fetches data correctly', async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // Check for loading state
    expect(screen.getByText(/Loading lessons.../)).toBeInTheDocument();

    // Wait for the loading state to disappear
    await waitFor(() => expect(screen.queryByText(/Loading lessons.../)).toBeNull());

    // Check if 'Units' or UnitList is rendered
    expect(screen.getByText('Units')).toBeInTheDocument();
  });

  test('displays announcements after fetching them', async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // Wait for announcements to load
    await waitFor(() => expect(screen.queryByText(/Loading lessons.../)).toBeNull());

    // Check if 'Announcements' is rendered
    expect(screen.getByText('Announcements')).toBeInTheDocument();
  });
});
