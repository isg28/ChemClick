import React from 'react';
import DashboardHeader from './DashboardHeader';
import '../../styles/dashboard/Dashboard.css';



function Dashboard() {
  //const username = "Walter W"; // CHANGE, once we can make the data dynamic!
  return (
    <div className="Dashboard">
      <DashboardHeader />
    </div>
  );
}

export default Dashboard;