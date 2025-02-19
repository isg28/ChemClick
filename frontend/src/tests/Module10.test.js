import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LessonTenPointOne from '../components/question/LessonTenPointOne';
import LessonTenPointTwo from '../components/question/LessonTenPointTwo';
import LessonTenPointThree from '../components/question/LessonTenPointThree';

// Mock local storage
beforeEach(() => {
    localStorage.setItem('studentId', 'testStudent');
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Lesson 10.1 Tests', () => {
    test('renders LessonTenPointOne correctly', async () => {
        render(<LessonTenPointOne />);
        
        expect(screen.getByText('Unit Ten: Ionic Compounds (Polyatomic Ions)')).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes('Drag & drop the correct symbols'))).toBeInTheDocument();
    });
      

    test('should display correct feedback after submission', async () => {
        render(<LessonTenPointOne />);
        
        const submitButton = screen.getByText('Submit Answer');
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(/Please fill out all the symbols before submitting./)).toBeInTheDocument();
        });
    });
});

describe('Lesson 10.2 Tests', () => {
    test('renders LessonTenPointTwo correctly', () => {
        render(<LessonTenPointTwo />);
        expect(screen.getByText('Unit Ten: Ionic Compounds (Polyatomic Ions)')).toBeInTheDocument();
    });

    test('prevents typing directly into input for symbol questions', () => {
        render(<LessonTenPointTwo />);
        
        const inputBox = screen.getByPlaceholderText(/Click the buttons below...|Type your answer here.../);
        fireEvent.keyDown(inputBox, { key: 'A' });

        expect(inputBox.value).toBe('');
    });
});

describe('Lesson 10.3 Tests', () => {
    test('renders LessonTenPointThree correctly', () => {
        render(<LessonTenPointThree />);
        expect(screen.getByText('Unit Ten: Ionic Compounds (Polyatomic Ions)')).toBeInTheDocument();
    });

    test('should allow input of compound name', () => {
        render(<LessonTenPointThree />);
        
        const inputBox = screen.getByPlaceholderText('Type the compound name...');
        fireEvent.change(inputBox, { target: { value: 'Sodium Nitrate' } });

        expect(inputBox.value).toBe('Sodium Nitrate');
    });

    test('provides feedback for incorrect answer', async () => {
        render(<LessonTenPointThree />);
        
        const inputBox = screen.getByPlaceholderText('Type the compound name...');
        fireEvent.change(inputBox, { target: { value: 'Incorrect Name' } });

        const submitButton = screen.getByText('Submit Answer');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/ Incorrect. Try again!/)).toBeInTheDocument();
        });
    });
});
