import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import '../../styles/profile/Profile.css';

function Profile() {
  const [unitSectionStatusOC, unitSectionStatusSetOC] = useState([false, false, false]);

  const handlesSectionToggleOC = (unitBoxNumber) => {
    const newUnitSectionStatus = [...unitSectionStatusOC];
    newUnitSectionStatus[unitBoxNumber] = !newUnitSectionStatus[unitBoxNumber];
    unitSectionStatusSetOC(newUnitSectionStatus);
  };

  const unitNames = [
    'Uncertainty of Measurement: Visible Scale',
    "Structure of an Atom: Bohr's Model",
    'Nomenclature: Symbols Name',
  ];

  return (
    <div className="Profile">
      <ProfileHeader />

      <div className="profileResultsContainer">
        <h2 className="resultsTitle">Results</h2>
        <div className="listOfUnits">
          {[0, 1, 2].map((unitBoxNumber) => (
            <div
              key={unitBoxNumber}
              className={`individualUnits ${unitSectionStatusOC[unitBoxNumber] ? 'expanded' : ''}`}
            >
              <div className="clickOnUnit" onClick={() => handlesSectionToggleOC(unitBoxNumber)}>
                <span className="trianglesOC">
                  {unitSectionStatusOC[unitBoxNumber] ? '▲' : '▶'}
                </span>
                <span className="nameOfUnit">
                  {unitNames[unitBoxNumber]}
                </span>
              </div>
              {unitSectionStatusOC[unitBoxNumber] && (
                <div className="expandedColorBox">
                  <div className="overflowContainer">
                   
                   
                   
                   
                    {unitBoxNumber === 0 && (
                      <>
                        <table className="dateResultsExpandedTable">
                          <thead>
                            <tr>
                              <th className="DateResultstableHeader">Date Completed: 01/27/2024 at 11:54 AM </th>
                            </tr>
                          </thead>
                        </table>

                        <table className="resultsExpandedTable">
                          <thead>
                            <tr>
                              <th className="lessonResultstableHeader">Lesson</th>
                              <th className="QAresultstableHeader">Questions Asked</th>
                              <th className="timeResultsTableHeader">Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="lessonResultstableCell">Visible Scale - Ruler</td>
                              <td className="QAresultsTableCell">35</td>
                              <td className="timeResultsTableCell">1 Hour and 10 Minutes</td>
                            </tr>
                            <tr>
                              <td className="lessonResultstableCell">Visible Scale - Cylinder</td>
                              <td className="QAresultsTableCell">26</td>
                              <td className="timeResultsTableCell">47 Minutes</td>
                            </tr>
                            <tr>
                              <td className="lessonResultstableCell">Digital Scale - Balance</td>
                              <td className="QAresultsTableCell">7</td>
                              <td className="timeResultsTableCell">17 Minutes</td>
                            </tr>
                          </tbody>
                        </table>

                        <table className="printResultsExpandedTable">
                          <thead>
                            <tr>
                              <button className='printButton'>Click to Print Certificate</button>
                            </tr>
                          </thead>
                        </table>
                      </>
                    )}


                    {unitBoxNumber === 1 && (
                      <>
                        <table className="dateResultsExpandedTable">
                          <thead>
                            <tr>
                              <th className="DateResultstableHeader">Date Completed: 02/28/2024 at 1:53 AM</th>
                            </tr>
                          </thead>
                        </table>

                        <table className="resultsExpandedTable">
                          <thead>
                            <tr>
                              <th className="lessonResultstableHeader">Lesson</th>
                              <th className="QAresultstableHeader">Questions Asked</th>
                              <th className="timeResultsTableHeader">Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="lessonResultstableCell">Bohr's Model Description</td>
                              <td className="QAresultsTableCell">12</td>
                              <td className="timeResultsTableCell"> 28 Minutes</td>
                            </tr>
                            <tr>
                              <td className="lessonResultstableCell">Subatomic Particles</td>
                              <td className="QAresultsTableCell">32</td>
                              <td className="timeResultsTableCell">1 Hour and 33 Minutes</td>
                            </tr>
                          </tbody>
                        </table>

                        <table className="printResultsExpandedTable">
                          <thead>
                            <tr>
                              <button className='printButton'>Click to Print Certificate</button>
                            </tr>
                          </thead>
                        </table>
                      </>
                    )}



                    {unitBoxNumber === 2 && (
                      <>
                        <table className="dateResultsExpandedTable">
                          <thead>
                            <tr>
                              <th className="DateResultstableHeader">Date Completed: 03/29/2024 at 4:59 PM</th>
                            </tr>
                          </thead>
                        </table>

                        <table className="resultsExpandedTable">
                          <thead>
                            <tr>
                              <th className="lessonResultstableHeader">Lesson</th>
                              <th className="QAresultstableHeader">Questions Asked</th>
                              <th className="timeResultsTableHeader">Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="lessonResultstableCell">Periodic Table Symbols</td>
                              <td className="QAresultsTableCell">16</td>
                              <td className="timeResultsTableCell"> 31 Minutes</td>
                            </tr>
                            <tr>
                              <td className="lessonResultstableCell">Element Naming</td>
                              <td className="QAresultsTableCell">12</td>
                              <td className="timeResultsTableCell"> 42 Minutes</td>
                            </tr>
                          </tbody>
                        </table>

                        <table className="printResultsExpandedTable">
                          <thead>
                            <tr>
                              <button className='printButton'>Click to Print Certificate</button>
                            </tr>
                          </thead>
                        </table>
                      </>
                    )}


                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
