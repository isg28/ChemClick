import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import StatisticsPie from '../../components/statistics/StatisticsPie';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Mock react-router-dom's useParams
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

// Mock recharts components
jest.mock('recharts', () => ({
  PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
  Pie: ({ children }) => <div data-testid="pie">{children}</div>,
  Cell: ({ fill }) => <div data-testid="cell" style={{ backgroundColor: fill }}></div>,
  Tooltip: () => <div data-testid="tooltip">Tooltip</div>,
  Legend: () => <div data-testid="legend">Legend</div>,
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        not_started: 10,
        in_progress: 20,
        completed: 30,
      }),
  })
);

describe('StatisticsPie Component', () => {
  beforeEach(() => {
    // Mock useParams to return a lessonId
    useParams.mockReturnValue({ lessonId: '123' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    render(<StatisticsPie />);
    await waitFor(() => {
      expect(screen.getByText('Lesson Progress')).toBeInTheDocument();
    });
  });

  it('fetches and displays student progress data', async () => {
    render(<StatisticsPie />);

    // Wait for the fetch to complete and the component to update
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/lessons/studentProgress/123/');
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });
  });

  it('renders the correct number of Pie and Cell components', async () => {
    render(<StatisticsPie />);

    await waitFor(() => {
      expect(screen.getAllByTestId('pie').length).toBe(1); // Only one Pie component
      expect(screen.getAllByTestId('cell').length).toBe(3); // Three Cell components (one for each data entry)
    });
  });

  it('renders cells with the correct colors', async () => {
    render(<StatisticsPie />);

    await waitFor(() => {
      const cells = screen.getAllByTestId('cell');
      const expectedColors = ['#95A5A6', '#F1C40F', '#2ECC71']; // grey, yellow, green

      cells.forEach((cell, index) => {
        expect(cell).toHaveStyle(`background-color: ${expectedColors[index]}`);
      });
    });
  });

  it('renders Tooltip and Legend components', async () => {
    render(<StatisticsPie />);

    await waitFor(() => {
      expect(screen.getByTestId('tooltip')).toBeInTheDocument();
      expect(screen.getByTestId('legend')).toBeInTheDocument();
    });
  });

  it('handles fetch error gracefully', async () => {
    // Mock fetch to return an error
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    render(<StatisticsPie />);

    await waitFor(() => {
      expect(screen.getByText('Lesson Progress')).toBeInTheDocument();
    });
  });
});