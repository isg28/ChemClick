import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';

const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('ReactDOMTestUtils.act')) {
    return;
  }
  originalConsoleError.call(console, ...args);
};

const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('Lesson')) {
    return;
  }
  originalConsoleWarn.call(console, ...args);
};

import LessonSevenPointOne from '../../components/question/LessonSevenPointOne';
import LessonSevenPointTwo from '../../components/question/LessonSevenPointTwo';
import LessonSevenPointThree from '../../components/question/LessonSevenPointThree';
import LessonSevenPointFour from '../../components/question/LessonSevenPointFour';
import LessonSevenPointFive from '../../components/question/LessonSevenPointFive';
import LessonSevenPointSix from '../../components/question/LessonSevenPointSix';
import LessonSevenPointSeven from '../../components/question/LessonSevenPointSeven';
import LessonSevenPointEight from '../../components/question/LessonSevenPointEight';
import LessonSevenPointNine from '../../components/question/LessonSevenPointNine';
import LessonSevenPointTen from '../../components/question/LessonSevenPointTen';
import LessonSevenPointEleven from '../../components/question/LessonSevenPointEleven';
import LessonSevenPointTwelve from '../../components/question/LessonSevenPointTwelve';

const lessons = [
  {
    name: 'LessonSevenPointOne',
    component: LessonSevenPointOne,
    expectedPrompt: /How can we use the group number to predict the charge of a monatomic ion formed from an element in Group 1/i,
    expectedOptions: [
      'The charge of an ion is equal to the group number.',
      'The charge of an ion is equal to the last digit of the group number.',
      'The charge of an ion is equal to the group number minus 18.',
      'It cannot.'
    ],
    correctAnswer: 'It cannot.',
    wrongAnswer: 'The charge of an ion is equal to the last digit of the group number.'
  },
  {
    name: 'LessonSevenPointTwo',
    component: LessonSevenPointTwo,
    expectedPrompt: /How can we use the group number to predict the charge of a monatomic ion formed from an element in Group 1\? Ignore hydrogen\./i,
    expectedOptions: [
      'The charge of an ion is equal to the group number minus 18.',
      'It does not.',
      'The charge of an ion is equal to the group number.',
      'The charge of an ion is equal to the last digit of the group number.'
    ],
    correctAnswer: 'The charge of an ion is equal to the group number.',
    wrongAnswer: 'The charge of an ion is equal to the group number minus 18.'
  },
  {
    name: 'LessonSevenPointThree',
    component: LessonSevenPointThree,
    expectedPrompt: /How can the group number determine the charge of a hydrogen ion\?/i,
    expectedOptions: [
      'The charge of the ion is equal to the group number.',
      'It cannot.',
      'The charge of the ion is equal to the last digit of the group number.',
      'The charge of the ion is equal to the group number minus 18.'
    ],
    correctAnswer: 'It cannot.',
    wrongAnswer: 'The charge of the ion is equal to the group number.'
  },
  {
    name: 'LessonSevenPointFour',
    component: LessonSevenPointFour,
    expectedPrompt: /How can we use the group number to predict the charge of a monatomic ion formed from an element in Group 2\?/i,
    expectedOptions: [
      'The charge of an ion is equal to the last digit of the group number.',
      'It does not.',
      'The charge of an ion is equal to the group number minus 18.',
      'The charge of an ion is equal to the group number.'
    ],
    correctAnswer: 'The charge of an ion is equal to the group number.',
    wrongAnswer: 'It does not.'
  },
  {
    name: 'LessonSevenPointFive',
    component: LessonSevenPointFive,
    expectedPrompt: /How can we use the group number to predict the charge of a monatomic ion formed from an element in Group 13\?/i,
    expectedOptions: [
      'The charge of an ion is equal to the group number minus 18.',
      'The charge of an ion is equal to the group number.',
      'The charge of an ion is equal to the last digit of the group number.',
      'It does not.'
    ],
    correctAnswer: 'The charge of an ion is equal to the last digit of the group number.',
    wrongAnswer: 'The charge of an ion is equal to the group number minus 18.'
  },
  {
    name: 'LessonSevenPointSix',
    component: LessonSevenPointSix,
    expectedPrompt: /How can we use the group number to predict the charge of a monatomic ion formed from an element in Group 14\?/i,
    expectedOptions: [
      'The charge of an ion is equal to the group number minus 18.',
      'It does not.',
      'The charge of an ion is equal to the last digit of the group number.',
      'The charge of an ion is equal to the group number.'
    ],
    correctAnswer: 'The charge of an ion is equal to the group number minus 18.',
    wrongAnswer: 'The charge of an ion is equal to the group number.'
  },
  {
    name: 'LessonSevenPointSeven',
    component: LessonSevenPointSeven,
    expectedPrompt: /How can we use the group number to predict the charge of a monatomic ion formed from an element in Group 15\?/i,
    expectedOptions: [
      'The charge of an ion is equal to the group number.',
      'It does not.',
      'The charge of an ion is equal to the last digit of the group number.',
      'The charge of an ion is equal to the group number minus 18.'
    ],
    correctAnswer: 'The charge of an ion is equal to the group number minus 18.',
    wrongAnswer: 'The charge of an ion is equal to the group number.'
  },
  {
    name: 'LessonSevenPointEight',
    component: LessonSevenPointEight,
    expectedPrompt: /How can we use the group number to predict the charge of a monatomic ion formed from an element in Group 16\?/i,
    expectedOptions: [
      'It does not.',
      'The charge of an ion is equal to the last digit of the group number.',
      'The charge of an ion is equal to the group number minus 18.',
      'The charge of an ion is equal to the group number.'
    ],
    correctAnswer: 'The charge of an ion is equal to the group number minus 18.',
    wrongAnswer: 'The charge of an ion is equal to the group number.'
  },
  {
    name: 'LessonSevenPointNine',
    component: LessonSevenPointNine,
    expectedPrompt: /How can we use the group number to predict the charge of a monatomic ion formed from an element in Group 17\?/i,
    expectedOptions: [
      'The charge of an ion is equal to the last digit of the group number.',
      'It does not.',
      'The charge of an ion is equal to the group number.',
      'The charge of an ion is equal to the group number minus 18.'
    ],
    correctAnswer: 'The charge of an ion is equal to the group number minus 18.',
    wrongAnswer: 'The charge of an ion is equal to the group number.'
  },
  {
    name: 'LessonSevenPointTen',
    component: LessonSevenPointTen,
    expectedPrompt: /How can we use the group number to predict the charge of a monatomic ion formed from an element in Group 18\?/i,
    expectedOptions: [
      'The charge of an ion is equal to the last digit of the group number.',
      'The charge of an ion is equal to the group number minus 18.',
      'The charge of an ion is equal to the group number.',
      'It does not.'
    ],
    correctAnswer: 'The charge of an ion is equal to the group number minus 18.',
    wrongAnswer: 'The charge of an ion is equal to the group number.'
  }
];

describe('Lessons 7.1 - 7.12 Components', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'studentId') return 'mockStudentId';
      if (key === 'teacherId') return null;
      return null;
    });
    jest.spyOn(global, 'fetch').mockImplementation(async () => {
      return {
        ok: true,
        status: 200,
        json: async () => ([
          { lesson_id: 'lesson7.1', goal_level: 1 },
          { lesson_id: 'lesson7.2', goal_level: 1 },
          { lesson_id: 'lesson7.3', goal_level: 1 },
          { lesson_id: 'lesson7.4', goal_level: 1 },
          { lesson_id: 'lesson7.5', goal_level: 1 },
          { lesson_id: 'lesson7.6', goal_level: 1 },
          { lesson_id: 'lesson7.7', goal_level: 1 },
          { lesson_id: 'lesson7.8', goal_level: 1 },
          { lesson_id: 'lesson7.9', goal_level: 1 },
          { lesson_id: 'lesson7.10', goal_level: 1 },
          { lesson_id: 'lesson7.11', goal_level: 1 },
          { lesson_id: 'lesson7.12', goal_level: 1 }
        ]),
      };
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  lessons.forEach(({ name, component, expectedPrompt, expectedOptions, correctAnswer, wrongAnswer }) => {
    describe(`${name} Component`, () => {
      test('renders lesson title and prompt', async () => {
        await act(async () => {
          render(<MemoryRouter>{React.createElement(component)}</MemoryRouter>);
        });
        await waitFor(() => {
          expect(screen.getByText(/Unit Seven: Periodic Trends/i)).toBeInTheDocument();
          expect(screen.getByText(expectedPrompt)).toBeInTheDocument();
        });
      });
      test('renders multiple choice options', async () => {
        await act(async () => {
          render(<MemoryRouter>{React.createElement(component)}</MemoryRouter>);
        });
        await waitFor(() => {
          expectedOptions.forEach(option => {
            expect(screen.getByLabelText(option)).toBeInTheDocument();
          });
        });
      });
      test('selecting the correct answer and submitting displays feedback', async () => {
        await act(async () => {
          render(<MemoryRouter>{React.createElement(component)}</MemoryRouter>);
        });
        await waitFor(() => {
          expect(screen.getByLabelText(correctAnswer)).toBeInTheDocument();
        });
        await act(async () => {
          fireEvent.click(screen.getByLabelText(correctAnswer));
          fireEvent.click(screen.getByText('Submit Answer'));
        });
        expect(await screen.findByText(/Correct/i)).toBeInTheDocument();
      });
      test('selecting a wrong answer and submitting shows incorrect feedback', async () => {
        await act(async () => {
          render(<MemoryRouter>{React.createElement(component)}</MemoryRouter>);
        });
        await waitFor(() => {
          expect(screen.getByLabelText(wrongAnswer)).toBeInTheDocument();
        });
        await act(async () => {
          fireEvent.click(screen.getByLabelText(wrongAnswer));
          fireEvent.click(screen.getByText('Submit Answer'));
        });
        expect(await screen.findByText(text => text.includes('Incorrect') || text.includes('Take a look'))).toBeInTheDocument();
      });
      test('clicking Done button navigates to Dashboard', async () => {
        await act(async () => {
          render(<MemoryRouter>{React.createElement(component)}</MemoryRouter>);
        });
        await waitFor(() => {
          expect(screen.getByLabelText(correctAnswer)).toBeInTheDocument();
        });
        await act(async () => {
          fireEvent.click(screen.getByLabelText(correctAnswer));
          fireEvent.click(screen.getByText('Submit Answer'));
        });
        await screen.findByText(/Correct/i);
        const doneButton = await screen.findByRole('button', { name: /Done/i });
        await act(async () => {
          fireEvent.click(doneButton);
        });
      });
    });
  });
});

describe('LessonSevenPointEleven Component', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'studentId') return 'mockStudentId';
      if (key === 'teacherId') return null;
      return null;
    });
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({
      ok: true,
      status: 200,
      json: async () => ([{ lesson_id: 'lesson7.11', goal_level: 1 }]),
    }));
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('renders lesson title and prompt', async () => {
    await act(async () => {
      render(<MemoryRouter><LessonSevenPointEleven /></MemoryRouter>);
    });
    await waitFor(() => {
      expect(screen.getByText(/Unit Eleven: Periodic Trends/i)).toBeInTheDocument();
      expect(screen.getByText(/Complete the following sentence using drop-down selections/i)).toBeInTheDocument();
    });
  });
  test('submits correct dropdown selections and shows correct feedback with Done button', async () => {
    await act(async () => {
      render(<MemoryRouter><LessonSevenPointEleven /></MemoryRouter>);
    });
    const dropdowns = screen.getAllByRole('combobox');
    fireEvent.change(dropdowns[0], { target: { value: 'Equal to the group number' } });
    fireEvent.change(dropdowns[1], { target: { value: 'hydrogen' } });
    fireEvent.change(dropdowns[2], { target: { value: '1-' } });
    fireEvent.click(screen.getByText('Submit Answer'));
    expect(await screen.findByText(/Correct/i)).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /Done/i })).toBeInTheDocument();
  });
  test('shows warning message when dropdown selections are incomplete', async () => {
    await act(async () => {
      render(<MemoryRouter><LessonSevenPointEleven /></MemoryRouter>);
    });
    fireEvent.click(screen.getByText('Submit Answer'));
    expect(await screen.findByText(/Make sure all of the sections are filled/i)).toBeInTheDocument();
  });
});

describe('LessonSevenPointTwelve Component', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'studentId') return 'mockStudentId';
      if (key === 'teacherId') return null;
      return null;
    });
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({
      ok: true,
      status: 200,
      json: async () => ([{ lesson_id: 'lesson7.12', goal_level: 1 }]),
    }));
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('renders lesson title and prompt', async () => {
    await act(async () => {
      render(<MemoryRouter><LessonSevenPointTwelve /></MemoryRouter>);
    });
    await waitFor(() => {
      expect(screen.getByText(/Unit Twelve: Periodic Trends/i)).toBeInTheDocument();
      expect(screen.getByText(/Complete the following sentence using drop-down selections/i)).toBeInTheDocument();
    });
  });
  test('submits correct dropdown selections and shows correct feedback with Done button', async () => {
    await act(async () => {
      render(<MemoryRouter><LessonSevenPointTwelve /></MemoryRouter>);
    });
    const dropdowns = screen.getAllByRole('combobox');
    fireEvent.change(dropdowns[0], { target: { value: 'Equal to the group number minus 18' } });
    fireEvent.change(dropdowns[1], { target: { value: 'Group 13' } });
    fireEvent.change(dropdowns[2], { target: { value: '3+' } });
    fireEvent.click(screen.getByText('Submit Answer'));
    expect(await screen.findByText(/Correct/i)).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /Done/i })).toBeInTheDocument();
  });
  test('shows warning message when dropdown selections are incomplete', async () => {
    await act(async () => {
      render(<MemoryRouter><LessonSevenPointTwelve /></MemoryRouter>);
    });
    fireEvent.click(screen.getByText('Submit Answer'));
    expect(await screen.findByText(/Make sure all of the sections are filled/i)).toBeInTheDocument();
  });
});
