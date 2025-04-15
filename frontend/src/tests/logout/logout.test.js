import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import Logout from '../../components/logout/Logout'; 

const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0]?.includes('ReactDOMTestUtils.act')) return;
  originalConsoleError(...args);
};

const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes('logout')) return;
  originalConsoleWarn(...args);
};


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockNavigate = jest.fn();

describe('Logout Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders the logout message and logo', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Logout />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/You have been logged out!/i)).toBeInTheDocument();
    expect(screen.getByAltText(/ChemClick Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/SIGN BACK IN/i)).toBeInTheDocument();
  });

  test('clicking SIGN BACK IN navigates to /login', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Logout />
        </MemoryRouter>
      );
    });

    fireEvent.click(screen.getByText(/SIGN BACK IN/i));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('clicking the logo navigates to /', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Logout />
        </MemoryRouter>
      );
    });

    fireEvent.click(screen.getByAltText(/ChemClick Logo/i));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
