import React, { useState } from 'react';
import '../../styles/statisticsindividual/StatisticsTableIndividual.css';

function StatisticsTableIndividual({ lessons }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter lessons based on student ID
  const filteredLessons = lessons.filter(lesson =>
    lesson.studentid && lesson.studentid.includes(searchQuery)
  );

  return (
    <div className="statistics-table">
      {/* Search Box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Student ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Lessons List */}
      <ul className="statistics-lessons-list">
        {filteredLessons.map((lesson, index) => (
          <li key={index} className={`lesson ${lesson.status}`}>
            <div>
              <span><strong><u>{lesson.name}</u></strong></span>
              <span><strong> Date Due: {lesson.dateDue}</strong></span>
              {lesson.dateSubmitted && <span> Date Submitted: {lesson.dateSubmitted}</span>}
              {lesson.route && <a href={lesson.route}> Go to Lesson</a>}
            </div>
            {lesson.studentid && (
              <div className="student-info">
                <span>Student ID: {lesson.studentid}</span>
                <span> Percent Done: {lesson.percentdone}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatisticsTableIndividual;
