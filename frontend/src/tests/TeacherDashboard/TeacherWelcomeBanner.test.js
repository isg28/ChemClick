import React from 'react';
import { render, screen } from '@testing-library/react';
import TeacherWelcomeBanner from '../../components/teacherdashboard/TeacherWelcomeBanner';

describe('TeacherWelcomeBanner Component', () => {
  test('renders the welcome message', () => {
    render(<TeacherWelcomeBanner />);
    
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
  });
});
