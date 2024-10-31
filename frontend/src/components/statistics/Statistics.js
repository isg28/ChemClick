import React from 'react';
import StatisticsHeader from './StatisticsHeader';
import StatisticsTable from './StatisticsTable';
import '../../styles/statistics/Statistics.css';





function Statistics() {
  return (
    <div className="Statistics">
      <StatisticsHeader/>
      <StatisticsTable/>
    </div>
  );
}

export default Statistics;