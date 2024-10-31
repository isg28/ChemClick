import React, { useState } from 'react';

function TableSearch() {
  const [searchQuery, setSearchQuery] = useState({ name: '', studentId: '', percentDone: '' });

  const data = [
    { name: 'Reamonn Corkill', studentId: '1565448', percentDone: '63' },
    { name: 'Dara Lovell', studentId: '156123', percentDone: '25' },
    { name: 'Zorina Hugli', studentId: '98414123', percentDone: '50' },
    { name: 'Zorina Hugli', studentId: '98414123', percentDone: '50' },
    { name: 'Dara Lovell', studentId: '156123', percentDone: '25' },
    { name: 'Zorina Hugli', studentId: '98414123', percentDone: '50' },
    { name: 'Dara Lovell', studentId: '156123', percentDone: '25' },
    { name: 'Zorina Hugli', studentId: '98414123', percentDone: '50' },
    { name: 'Reamonn Corkill', studentId: '1565448', percentDone: '63' },
    { name: 'Dara Lovell', studentId: '156123', percentDone: '25' },
    { name: 'Zorina Hugli', studentId: '98414123', percentDone: '50' },
    { name: 'Reamonn Corkill', studentId: '1565448', percentDone: '63' },
    { name: 'Reamonn Corkill', studentId: '1565448', percentDone: '63' },
    { name: 'Reamonn Corkill', studentId: '1565448', percentDone: '63' },
    { name: 'Reamonn Corkill', studentId: '1565448', percentDone: '63' },
    { name: 'Reamonn Corkill', studentId: '1565448', percentDone: '63' },
    { name: 'Reamonn Corkill', studentId: '1565448', percentDone: '63' },
    { name: 'Reamonn Corkill', studentId: '1565448', percentDone: '63' },
    { name: 'Reamonn Corkill', studentId: '1565448', percentDone: '63' },
    
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
                placeholder="Student Id"
                onChange={handleSearchChange}
                value={searchQuery.studentId}
              />
            </th>
            <th>
              <input
                type="text"
                name="percentDone"
                className="search-input"
                placeholder="Percent Done"
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
