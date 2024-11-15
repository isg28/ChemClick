import React, { useState, useEffect } from 'react';

function TableSearch() {
  const [searchQuery, setSearchQuery] = useState({ studentId: '', percentDone: '' });
  const [data, setData] = useState([]); 
  const [error, setError] = useState(null); 

  
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
        setData(users); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load student data.");
      });
  }, []); 

  
  const handleSearchChange = (e) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

 
  const filteredData = data.filter(
    (row) =>
      row.student_id.toLowerCase().includes(searchQuery.studentId) &&  
      (row.percentDone || "").toString().toLowerCase().includes(searchQuery.percentDone)  
  );

  return (
    <div className="table-container">
      <h2>Student Data</h2>
      {error && <p>{error}</p>} {}

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
                <td>{row.student_id}</td> {}
                <td>{row.percentDone || "N/A"}</td> {}
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
