import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TeacherAnnouncements from '../../components/teacherdashboard/TeacherAnnouncements';

describe('TeacherAnnouncements Component', () => {
  const mockAnnouncements = [
    { id: 1, author: 'Jane Doe', date: new Date().toISOString(), message: 'Test Announcement 1' },
    { id: 2, author: 'John Smith', date: new Date().toISOString(), message: 'Test Announcement 2' }
  ];

  const mockPost = jest.fn();
  const mockEdit = jest.fn();
  const mockDelete = jest.fn();
  const mockDeleteAll = jest.fn();
  const mockRef = React.createRef();

  beforeEach(() => {
    render(
      <TeacherAnnouncements
        announcements={mockAnnouncements}
        postAnnouncement={mockPost}
        editAnnouncement={mockEdit}
        deleteAnnouncement={mockDelete}
        deleteAllAnnouncements={mockDeleteAll}
        announcementsRef={mockRef}
      />
    );
  });

  it('renders all announcements', () => {
    expect(screen.getByText('Test Announcement 1')).toBeInTheDocument();
    expect(screen.getByText('Test Announcement 2')).toBeInTheDocument();
  });

  it('calls postAnnouncement when a message is entered and posted', () => {
    fireEvent.change(screen.getByPlaceholderText('Write your announcement here...'), {
      target: { value: 'New Announcement!' }
    });
    fireEvent.click(screen.getByText('Post'));
    expect(mockPost).toHaveBeenCalledWith('MATT BRIMBERRY', 'New Announcement!');
  });

  it('calls editAnnouncement when saving an edited announcement', () => {
    fireEvent.click(screen.getAllByText('Edit')[0]);
    fireEvent.change(screen.getByDisplayValue('Test Announcement 1'), {
      target: { value: 'Updated Message' }
    });
    fireEvent.click(screen.getByText('Save'));
    expect(mockEdit).toHaveBeenCalledWith(1, 'Updated Message');
  });

  it('calls deleteAnnouncement when confirming delete', () => {
    // Mock window.confirm to always return true
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(mockDelete).toHaveBeenCalledWith(1);
    window.confirm.mockRestore();
  });

  it('calls deleteAllAnnouncements when clicking "Delete All"', () => {
    fireEvent.click(screen.getByText('Delete All'));
    expect(mockDeleteAll).toHaveBeenCalled();
  });
});
