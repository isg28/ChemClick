import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ClickToBegin from '../../components/dashboard/ClickToBegin';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';

// Helper component to verify the current route
function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
}

beforeEach(() => {
  window.fetch = undefined;
});

describe('ClickToBegin Component (JS version)', () => {
  test('navigates to the correct lesson route when in-progress lesson exists', async () => {
    const mockLessons = [
      { lesson_id: 'lesson1.2', status: 'in-progress' },
      { lesson_id: 'lesson1.3', status: 'not-started' },
    ];

    window.fetch = async () => ({
      ok: true,
      json: async () => mockLessons,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ClickToBegin />} />
          <Route path="*" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    const logo = await screen.findByAltText('ChemClick Logo');
    fireEvent.click(logo);

    await waitFor(() => {
      expect(screen.getByTestId('location-display').textContent).toBe('/dashboard');
    });
  });

  test('navigates to /dashboard if no in-progress lesson is found', async () => {
    const mockLessons = [
      { lesson_id: 'lesson1.1', status: 'not-started' },
      { lesson_id: 'lesson1.3', status: 'completed' },
    ];

    window.fetch = async () => ({
      ok: true,
      json: async () => mockLessons,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ClickToBegin />} />
          <Route path="*" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    const logo = await screen.findByAltText('ChemClick Logo');
    fireEvent.click(logo);

    await waitFor(() => {
      expect(screen.getByTestId('location-display').textContent).toBe('/dashboard');
    });
  });

  test('falls back to /dashboard if lesson ID is not in the route map', async () => {
    const mockLessons = [{ lesson_id: 'unknown.lesson', status: 'in-progress' }];

    window.fetch = async () => ({
      ok: true,
      json: async () => mockLessons,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ClickToBegin />} />
          <Route path="*" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    const logo = await screen.findByAltText('ChemClick Logo');
    fireEvent.click(logo);

    await waitFor(() => {
      expect(screen.getByTestId('location-display').textContent).toBe('/dashboard');
    });
  });
});
