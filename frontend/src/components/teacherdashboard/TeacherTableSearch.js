import React, { useState, useEffect } from 'react';

function TableSearch() {
  const [searchQuery, setSearchQuery] = useState({ studentId: '', percentDone: '' });
  const [data, setData] = useState([]); // State to store the fetched student data
  const [error, setError] = useState(null); // State to store errors

  // Fetch data when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((users) => {
        console.log("Fetched users:", users);
        setData(users); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load student data.");
      });
  }, []); // Empty dependency array ensures this runs once on component mount

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  // Filter the data based on search queries
  const filteredData = data.filter(
    (row) =>
      row.student_id.toLowerCase().includes(searchQuery.studentId) &&  // Use student_id from MongoDB
      (row.percentDone || "").toString().toLowerCase().includes(searchQuery.percentDone)  // If percentDone is missing, handle it
  );

  return (
    <div className="table-container">
      <h2>Student Data</h2>
      {error && <p>{error}</p>} {/* Display error message if there was an issue fetching data */}

      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="text"
                name="studentId"
                className="search-input"
                placeholder="Search Student ID"
                onChange={handleSearchChange}
                value={searchQuery.studentId}
              />
            </th>
            <th>
              <input
                type="text"
                name="percentDone"
                className="search-input"
                placeholder="Search Percent Done"
                onChange={handleSearchChange}
                value={searchQuery.percentDone}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.student_id}</td> {/* Display student_id from MongoDB */}
                <td>{row.percentDone || "N/A"}</td> {/* If percentDone is missing, display "N/A" */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Loading or No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableSearch;
