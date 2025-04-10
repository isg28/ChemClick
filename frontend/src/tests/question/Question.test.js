import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Question from '../../components/question/Question'; // adjust path if needed

describe('Question Component UI', () => {
  test('renders Mastery and Goal sections correctly', () => {
    render(
      <MemoryRouter>
        <Question />
      </MemoryRouter>
    );

    // Check for text content
    expect(screen.getByText(/Mastery/i)).toBeInTheDocument();
    expect(screen.getByText(/Goal/i)).toBeInTheDocument();

    // Optional: Check for container elements
    const masteryBox = document.querySelector('.masterybox');
    const goalBox = document.querySelector('.goalbox');
    expect(masteryBox).toBeInTheDocument();
    expect(goalBox).toBeInTheDocument();
  });
});
