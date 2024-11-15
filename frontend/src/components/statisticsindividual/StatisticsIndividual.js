import React from 'react';
import StatisticsHeaderIndividual from './StatisticsHeaderIndividual';
import StatisticsTableIndividual from './StatisticsTableIndividual';
import '../../styles/statisticsindividual/StatisticsIndividual.css';



const unitData = [
  {
    number: 1,
    title: "Uncertainty in Measurement: Visible Scale",
    lessons: [
      { name: "Lesson 1.1: Tenths Value", status: "completed", dateDue: "Oct. 30, 2024", dateSubmitted: "Nov. 1, 2024", route: "/LessonOnePointOne" , studentid: "111111", percentdone: "50%"},        
      { name: "Lesson 1.2: Tenths Value", status: "completed", submittedLate: true, dateDue: "Nov. 10, 2024", dateSubmitted: "Nov. 11, 2024", route: "/LessonOnePointTwo", studentid: "111111", percentdone: "50%" },
      { name: "Lesson 1.3: Tenths Value", status: "in-progress", dateDue: "Nov. 18, 2024" , studentid: "111111", percentdone: "50%"},
      { name: "Lesson 1.4: Hundredths Digit", status: "locked", dateDue: "[LOCKED]", studentid: "111111", percentdone: "50%" },
      { name: "Lesson 1.5: Hundredths Digit", status: "locked", dateDue: "[LOCKED]" , studentid: "111111", percentdone: "50%"},
      { name: "Lesson 1.6: Hundredths Digit", status: "locked", dateDue: "[LOCKED]" , studentid: "111111", percentdone: "50%"},
      { name: "Lesson 1.7: Meniscus (Vertical Scale)", status: "locked", dateDue: "[LOCKED]", studentid: "111111", percentdone: "50%" },
      { name: "Lesson 1.8: Meniscus (Vertical Scale)", status: "locked", dateDue: "[LOCKED]", route: "/LessonOnePointEight" , studentid: "111111", percentdone: "50%"},
      { name: "Lesson 1.9: Meniscus (Vertical Scale)", status: "locked", dateDue: "[LOCKED]" , studentid: "111111", percentdone: "50%"},
      { name: "Lesson 1.10: Meniscus (Vertical Scale)", status: "locked", dateDue: "[LOCKED]" , studentid: "111111", percentdone: "50%"},
      { name: "Lesson 1.11: Meniscus (Vertical Scale)", status: "locked", dateDue: "[LOCKED]" , studentid: "111111", percentdone: "50%"},
      { name: "Lesson 1.12: Meniscus (Vertical Scale)", status: "locked", dateDue: "[LOCKED]" , studentid: "111111", percentdone: "50%"}
    ]
  },
  {
    number: 2,
    title: "Uncertainty in Measurements (Digital Scale-Balance)",
    lessons: [
      { name: "Lesson 2.1: Digital Scale-Balance", status: "locked", dateDue: "[LOCKED]", studentid: "111111", percentdone: "50%" },
      { name: "Lesson 2.2: Reading a Standard", status: "locked", dateDue: "[LOCKED]" , studentid: "111111", percentdone: "50%"}
    ]
  },
  {
    number: 3,
    title: "Nomenclature: Symbols Name",
    lessons: [
      { name: "Periodic Table Symbols", status: "locked", dateDue: "[LOCKED]" , studentid: "111111", percentdone: "50%"},
      { name: "Element Naming", status: "locked", dateDue: "[LOCKED]" , studentid: "111111", percentdone: "50%"}
    ]
  }
];

function StatisticsIndividual() {
  return (
    <div className="StatisticsIndividual">
      <StatisticsHeaderIndividual />
      <div className="statisticsindividual-container">
        {unitData.map((unit, index) => (
          <div key={index} className="statistics-lessons-list">
            <h1>{unit.title}</h1>
            <StatisticsTableIndividual lessons={unit.lessons} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatisticsIndividual;