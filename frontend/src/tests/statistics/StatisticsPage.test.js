import React from 'react';
import { render } from '@testing-library/react';
import Statistics from '../../components/statistics/Statistics';
import StatisticsHeader from '../../components/statistics/StatisticsHeader';
import StatisticsTable from '../../components/statistics/StatisticsTable';
import StatisticsPie from '../../components/statistics/StatisticsPie';

// Mock the child components
jest.mock('../../components/statistics/StatisticsHeader', () => () => <div data-testid="statistics-header">StatisticsHeader</div>);
jest.mock('../../components/statistics/StatisticsTable', () => () => <div data-testid="statistics-table">StatisticsTable</div>);
jest.mock('../../components/statistics/StatisticsPie', () => () => <div data-testid="statistics-pie">StatisticsPie</div>);

describe('Statistics Component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Statistics />);
    expect(getByTestId('statistics-header')).toBeInTheDocument();
    expect(getByTestId('statistics-table')).toBeInTheDocument();
    expect(getByTestId('statistics-pie')).toBeInTheDocument();
  });

  it('renders the correct child components', () => {
    const { getByText } = render(<Statistics />);
    expect(getByText('StatisticsHeader')).toBeInTheDocument();
    expect(getByText('StatisticsTable')).toBeInTheDocument();
    expect(getByText('StatisticsPie')).toBeInTheDocument();
  });
});