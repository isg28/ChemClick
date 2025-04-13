import React from 'react';
import { render, screen } from '@testing-library/react';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';

describe('WelcomeBanner', () => {
  test('renders welcome message', () => {
    render(<WelcomeBanner />);
    const bannerText = screen.getByText(/Welcome Back!/i);
    expect(bannerText).toBeInTheDocument();
  });
});
