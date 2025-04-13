import React from 'react';
import { render, screen } from '@testing-library/react';
import Announcements from '../../components/dashboard/Announcements';

describe('Announcements Component', () => {
  const mockAnnouncements = [
    {
      id: '1',
      author: 'Mr. Smith',
      date: '2025-04-10T10:00:00Z',
      message: 'Welcome back from break!',
    },
    {
      id: '2',
      author: 'Ms. Johnson',
      date: '2025-04-09T09:00:00Z',
      message: 'Don’t forget to submit your project.',
    },
  ];

  beforeEach(() => {
    render(<Announcements announcements={mockAnnouncements} />);
  });

  test('renders the component title', () => {
    expect(screen.getByText('Announcements')).toBeInTheDocument();
  });

  test('renders each announcement with author and message', () => {
    mockAnnouncements.forEach(({ author, message }) => {
      expect(screen.getByText(author)).toBeInTheDocument();
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });

  test('renders the date label', () => {
    const postedLabels = screen.getAllByText(/Posted on:/);
    expect(postedLabels.length).toBeGreaterThan(0);
  });

  test('applies "latest-message" class to the most recent announcement', () => {
    const latestMessage = screen.getByText(mockAnnouncements[0].message).closest('.announcement-message');
    expect(latestMessage).toHaveClass('latest-message');
  });
});
