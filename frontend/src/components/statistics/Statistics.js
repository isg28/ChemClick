import React from 'react';
import StatisticsHeader from './StatisticsHeader';
import StatisticsTable from './StatisticsTable';
import StatisticsPie from './StatisticsPie';
import '../../styles/statistics/Statistics.css';

function Statistics() {
  return (
    <div className="Statistics">
      <StatisticsHeader/>
      <StatisticsTable/>
      <StatisticsPie />
    </div>
  );
}

export default Statistics;