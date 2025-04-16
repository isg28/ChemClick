import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/statistics/StatisticsTable.css';

function TableSearch() {
  const { lessonId } = useParams();
  const [studentStats, setStudentStats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");


  useEffect(() => {
    const fetchStudentProgress = async () => {
      try {
        setLoading(true);
        const isLocal = window.location.hostname.includes('localhost');

        const BASE_URL = isLocal
          ? 'http://localhost:8000'
          : 'https://chemclick.onrender.com'
        const response = await fetch(`${BASE_URL}/lessons/${lessonId}/students/`);
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

  const formatAsPercentage = (value) => {
    if (typeof value === 'number') {
      if(value === 0){
        return `0%`;
      }
      return `${(value).toFixed(2)}%`; // Convert to percentage and limit to 2 decimal places
    }
    return "N/A";
  };

  const formatLateString = (value) => {
    if(value){
      return 'Yes';
    } else {
      return 'No';
    }
  }

  // filtering logic for search bar
  const filteredData = studentStats.filter((row) => {
    if (!globalSearchQuery.trim()) {
      return true; // show all data when the search bar is empty
    }

    const searchTerms = globalSearchQuery.toLowerCase().split(",").map(term => term.trim());
  
    return searchTerms.every((term) => {
      const [key, value] = term.split(":").map(part => part.trim()); // extract key-value pair
  
      switch (key) {
        case "id":
          return row.user_id.toLowerCase().includes(value);
        case "progress":
          return row.progress.toString() === value;
        case "mastery":
          return row.mastery_level.toString() === value;
        case "attempts":
          return row.total_attempts.toString() === value;
        case "status":
          return row.status.toLowerCase().includes(value);
        case "late":
          return formatLateString(row.is_late).toLowerCase() === value;
        default:
          return false; // ignore unrecognized search keys
      }
    });
  });  
  

  // sorting logic
  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData]; // use filteredData for sorting
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

  // handle column header click for sorting
  const handleSort = (key) => {
    if (key === 'progress' || key === 'mastery_level') {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    }
  };

  // handle individual row reset (resetting user progress from backend)
  const handleRowClick = async (studentId) => {
    const confirmReset = window.confirm(`Are you sure you want to reset student ${studentId}'s progress?`);
    if (!confirmReset) return;
  
    try {
      const isLocal = window.location.hostname.includes('localhost');

      const BASE_URL = isLocal
        ? 'http://localhost:8000'
        : 'https://chemclick.onrender.com'
      const response = await fetch(`${BASE_URL}/lessons/${lessonId}/students/${studentId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          progress: 0,
          mastery_level: 0,
          total_attempts: 0,
          status: 'not_started',
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to reset student progress.");
      }
  
      // update the UI without needing to fetch again
      setStudentStats((prevStats) =>
        prevStats.map((student) =>
          student.user_id === studentId
            ? { ...student, progress: 0, mastery_level: 0, total_attempts: 0, status: 'Not Started', late: false }
            : student
        )
      );
  
      alert(`Student ${studentId}'s progress has been reset.`);
    } catch (error) {
      console.error("Error resetting student progress:", error);
      alert("Failed to reset student progress.");
    }
  };
  
  // handle whole lesson reset
  const resetAllStudentProgress = async () => {
    const confirmReset = window.confirm("Are you sure you want to reset all student progress for this lesson?");
    if (!confirmReset) return;

    try {
      const isLocal = window.location.hostname.includes('localhost');

      const BASE_URL = isLocal
        ? 'http://localhost:8000'
        : 'https://chemclick.onrender.com'
      const response = await fetch(`${BASE_URL}/lessons/${lessonId}/reset_all_progress/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to reset all student progress.");
      }

      // update the UI to reflect the reset progress
      setStudentStats((prevStats) =>
        prevStats.map((student) => ({
          ...student,
          progress: 0,
          mastery_level: 0,
          total_attempts: 0,
          status: 'Not Started',
          late: false,
        }))
      );

      alert("All student progress has been reset.");
    } catch (error) {
      console.error("Error resetting all student progress:", error);
      alert("Failed to reset all student progress.");
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
            <th className='table-header' colSpan={6}>
              <input
                type="text"
                className="search-input"
                placeholder="Search (e.g., id: 123456, progress: 100, mastery: 80, attempts: 4, status: completed, late: no)"
                onChange={(e) => setGlobalSearchQuery(e.target.value.toLowerCase())}
                value={globalSearchQuery}
              />
            </th>
          </tr>
          <tr className="table-header-row">
                <th className="table-header">Student ID</th>
                <th onClick={() => handleSort('progress')} className="table-header sortable">
                  Percent <br /> Done {sortConfig.key === 'progress' && (sortConfig.direction === 'asc' ? '↓' : '↑')}
                </th>
                <th onClick={() => handleSort('mastery_level')} className="table-header sortable">
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
              <tr key={index} 
                className="table-row"
                onClick={() => handleRowClick(row.user_id)}
              >
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
      <button className="statistics-page-reset-button"
        onClick={resetAllStudentProgress}>
          Wipe all Student Progress for this lesson</button>
    </div>
  );
}

export default TableSearch;