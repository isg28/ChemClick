import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TeacherDashboardHeader from '../../components/teacherdashboard/TeacherDashboardHeader';
import { MemoryRouter } from 'react-router-dom';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('TeacherDashboardHeader', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <TeacherDashboardHeader />
      </MemoryRouter>
    );
  });

  it('renders logo and dashboard title', () => {
    expect(screen.getByAltText('ChemClick Logo')).toBeInTheDocument();
    const dashboardTitles = screen.getAllByText('Teacher Dashboard');
    const headerTitle = dashboardTitles.find(el => el.tagName === 'SPAN');
    expect(headerTitle).toBeInTheDocument();
  });

  it('toggles dropdown menu on menu-bar click', () => {
    const menuBar = document.querySelector('.menu-bar');
    const dropdown = document.getElementById('myDropdown');

    // Initially hidden
    expect(dropdown.classList.contains('show')).toBe(false);

    // Click to show
    fireEvent.click(menuBar);
    expect(dropdown.classList.contains('show')).toBe(true);

    // Click again to hide
    fireEvent.click(menuBar);
    expect(dropdown.classList.contains('show')).toBe(false);
  });

  it('navigates to /dashboard when Dashboard is clicked', () => {
    const dashboardLink = screen.getByText('Dashboard');
    fireEvent.click(dashboardLink);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('navigates to /profile when Profile Page is clicked', () => {
    const profileLink = screen.getByText('Profile Page');
    fireEvent.click(profileLink);
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  it('navigates to /teacherdashboard when Teacher Dashboard is clicked', () => {
    const teacherLinks = screen.getAllByText('Teacher Dashboard');
    const navLink = teacherLinks.find(el => el.tagName === 'UL');
    fireEvent.click(navLink);
    expect(mockNavigate).toHaveBeenCalledWith('/teacherdashboard');
  });

  it('navigates to /logout when Sign Out is clicked', () => {
    const logoutLink = screen.getByText('Sign Out');
    fireEvent.click(logoutLink);
    expect(mockNavigate).toHaveBeenCalledWith('/logout');
  });
});
