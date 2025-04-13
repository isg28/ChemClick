import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
}

function renderWithRoutes() {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <DashboardHeader />
              <LocationDisplay />
            </>
          }
        />
        <Route path="/dashboard" element={<LocationDisplay />} />
        <Route path="/profile" element={<LocationDisplay />} />
        <Route path="/teacherdashboard" element={<LocationDisplay />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('DashboardHeader', () => {
  test('toggles dropdown when menu-bar is clicked', () => {
    renderWithRoutes();
    const dropdown = document.getElementById('myDropdown');
    const menuBar = document.querySelector('.menu-bar');

    expect(dropdown.classList.contains('show')).toBe(false);
    fireEvent.click(menuBar);
    expect(dropdown.classList.contains('show')).toBe(true);
    fireEvent.click(menuBar);
    expect(dropdown.classList.contains('show')).toBe(false);
  });

  test('navigates to /dashboard', () => {
    renderWithRoutes();
    fireEvent.click(screen.getByText('Dashboard'));
    expect(screen.getByTestId('location-display').textContent).toBe('/dashboard');
  });

  test('navigates to /profile', () => {
    renderWithRoutes();
    fireEvent.click(screen.getByText('Profile Page'));
    expect(screen.getByTestId('location-display').textContent).toBe('/profile');
  });

  test('navigates to /teacherdashboard if user is teacher', () => {
    localStorage.setItem('role', 'teacherId');
    renderWithRoutes();
    fireEvent.click(screen.getByText('Teacher Dashboard'));
    expect(screen.getByTestId('location-display').textContent).toBe('/teacherdashboard');
  });
});
