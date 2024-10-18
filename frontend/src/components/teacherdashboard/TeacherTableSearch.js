import React, { useState } from 'react';

function TableSearch() {
  const [searchQuery, setSearchQuery] = useState({ name: '', studentId: '', percentDone: '' });

  const data = [
    { name: 'Reamonn Corkill', studentId: 'Pharmacist', percentDone: 'France' },
    { name: 'Dara Lovell', studentId: 'Assistant Professor', percentDone: 'Russia' },
    { name: 'Zorina Hugli', studentId: 'Design Engineer', percentDone: 'China' },
    // Add more data here...
  ];

  const handleSearchChange = (e) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.name) &&
      row.studentId.toLowerCase().includes(searchQuery.studentId) &&
      row.percentDone.toLowerCase().includes(searchQuery.percentDone)
  );

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="text"
                name="name"
                className="search-input"
                placeholder="Full Name"
                onChange={handleSearchChange}
                value={searchQuery.name}
              />
            </th>
            <th>
              <input
                type="text"
                name="studentId"
                className="search-input"
                placeholder="studentId"
                onChange={handleSearchChange}
                value={searchQuery.studentId}
              />
            </th>
            <th>
              <input
                type="text"
                name="percentDone"
                className="search-input"
                placeholder="percentDone"
                onChange={handleSearchChange}
                value={searchQuery.percentDone}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.studentId}</td>
              <td>{row.percentDone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSearch;
