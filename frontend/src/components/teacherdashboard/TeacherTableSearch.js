import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/statistics/StatisticsTable.css';

function TableSearch() {
  const { lessonId } = useParams();
  const [searchQuery, setSearchQuery] = useState({
    studentId: '',
    percentDone: '',
    masteryLevel: '',
    totalAttempts: '',
    status: '',
    isLate: ''
  });
  const [studentStats, setStudentStats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const fetchStudentProgress = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/lessons/${lessonId}/students/`);
        if (!response.ok) throw new Error("Failed to fetch statistics");

        const data = await response.json();
        setStudentStats(data); // Store the array directly
      } catch (error) {
        console.error("Error fetching student statistics:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) {
      fetchStudentProgress();
    }
  }, [lessonId]);

  const handleSearchChange = (e) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const formatAsPercentage = (value) => {
    if (typeof value === 'number') {
      if(value === 0){
        return `0%`
      }
      return `${(value).toFixed(2)}%`; // Convert to percentage and limit to 2 decimal places
    }
    return "N/A";
  };

  // filtering logic for search bar
  const filteredData = studentStats.filter((row) => {
    return (
      row.user_id.toLowerCase().includes(searchQuery.studentId) &&
      row.progress.toString().includes(searchQuery.percentDone) &&
      row.mastery_level.toString().includes(searchQuery.masteryLevel) &&
      row.total_attempts.toString().includes(searchQuery.totalAttempts) &&
      row.status.toLowerCase().includes(searchQuery.status) &&
      row.is_late.toString().includes(searchQuery.isLate)
    );
  });

  // sorting logic
  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData]; // Use filteredData for sorting
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  // Handle column header click for sorting
  const requestSort = (key) => {
    if (key === 'progress' || key === 'mastery_level') {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    }
  };

  return (
    <div className="table-container">
      <div className="student-stats-title">
        <p>Student Data</p>
      </div>
      {error && <p className="error-message">{error}</p>}

      <table className="student-stats-table">
        <thead className="student-stats-table-head">
          <tr className='table-row'>
            <th className='table-header'>
              <input
                type="text"
                name="studentId"
                className="search-input"
                placeholder="Search ID"
                onChange={handleSearchChange}
                value={searchQuery.studentId}
              />
            </th>
            <th className='table-header'>
              <input
                type="text"
                name="percentDone"
                className="search-input"
                placeholder="Search"
                onChange={handleSearchChange}
                value={searchQuery.percentDone}
              />
            </th>
            <th className='table-header'>
              <input
                type="text"
                name="masteryLevel"
                className="search-input"
                placeholder="Search"
                onChange={handleSearchChange}
                value={searchQuery.masteryLevel}
              />
            </th>
            <th className='table-header'>
              <input
                type="text"
                name="totalAttempts"
                className="search-input"
                placeholder="Search"
                onChange={handleSearchChange}
                value={searchQuery.totalAttempts}
              />
            </th>
            <th className='table-header'>
              <input
                type="text"
                name="status"
                className="search-input"
                placeholder="Search"
                onChange={handleSearchChange}
                value={searchQuery.status}
              />
            </th>
            <th className='table-header'>
              {/* <input
                type="text"
                name="isLate"
                className="search-input"
                placeholder="Search"
                onChange={handleSearchChange}
                value={searchQuery.isLate}
              /> */}
            </th>
          </tr>
          <tr className="table-header-row">
                <th className="table-header">Student ID</th>
                <th onClick={() => requestSort('progress')} className="table-header sortable">
                  Percent <br /> Done {sortConfig.key === 'progress' && (sortConfig.direction === 'asc' ? '↓' : '↑')}
                </th>
                <th onClick={() => requestSort('mastery_level')} className="table-header sortable">
                  Mastery <br /> Level {sortConfig.key === 'mastery_level' && (sortConfig.direction === 'asc' ? '↓' : '↑')}
                </th>
                <th className="table-header">Total <br /> Attempts</th>
                <th className="table-header">Status</th>
                <th className="table-header">Late?</th>
            </tr>
        </thead>
        <tbody className="student-stats-table-body">
          {loading ? (
            <tr className="loading-message">
              <td colSpan="6">
                <h3>Loading student progress...</h3>
              </td>
            </tr>
          ) : sortedData.length > 0 ? (
            sortedData.map((row, index) => (
              <tr key={index} className="table-row">
                <td className="table-data">{row.user_id}</td>
                <td className="table-data">{formatAsPercentage(row.progress) || "N/A"}</td>
                <td className="table-data">{formatAsPercentage(row.mastery_level) || "N/A"}</td>
                <td className="table-data">{row.total_attempts || 0}</td>
                <td className="table-data">{row.status || "N/A"}</td>
                <td className="table-data">{row.is_late ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableSearch;