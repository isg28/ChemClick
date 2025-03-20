import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AccountCreation from '../../components/accountcreation/AccountCreation';

beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Account created' }),
      })
    );
  });

describe('AccountCreation Component', () => {
  it('renders account creation form', () => {
    render(
      <MemoryRouter>
        <AccountCreation />
      </MemoryRouter>
    );

    expect(screen.getByText("STUDENT ID", { exact: true })).toBeInTheDocument();
    expect(screen.getByText("CONFIRM STUDENT ID", { exact: true })).toBeInTheDocument();
    expect(screen.getByText("PASSWORD", { exact: true })).toBeInTheDocument();
    expect(screen.getByText("CONFIRM PASSWORD", { exact: true })).toBeInTheDocument();
    expect(screen.getByText(/CREATE ACCOUNT/i)).toBeInTheDocument();
  });

  it('shows validation error if passwords do not match', () => {
    render(
      <MemoryRouter>
        <AccountCreation />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'testpass123' } });
    fireEvent.change(screen.getByTestId('confirmPassword-input'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByText(/CREATE ACCOUNT/i));

    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });

    it('calls fetch on account creation', async () => {
        render(
        <MemoryRouter>
            <AccountCreation />
        </MemoryRouter>
        );

        fireEvent.change(screen.getByTestId('studentId-input'), { target: { value: 'teststudent' } });
        fireEvent.change(screen.getByTestId('confirmId-input'), { target: { value: 'teststudent' } });
        fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'testpassword123' } });
        fireEvent.change(screen.getByTestId('confirmPassword-input'), { target: { value: 'testpassword123' } });

        fireEvent.click(screen.getByTestId('create-account-button'));

        await waitFor(() => expect(fetch).toHaveBeenCalled());
    });
});
