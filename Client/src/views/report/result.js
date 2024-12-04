import React, { useState } from 'react';
import './EditableResult.css'; // Import the CSS file for styling

const Results = () => {
  // Initial state for results
  const [results, setResults] = useState([
    {
      roll: 1,
      name: 'Student 1',
      term1: 0,
      term2: 0,
      final: 0,
      assignment1: 0,
      assignment2: 0,
      assignment3: 0,
      assignment4: 0,
      assignment5: 0,
      attendance: 0,
      total: 0,
    },
    {
      roll: 2,
      name: 'Student 2',
      term1: 0,
      term2: 0,
      final: 0,
      assignment1: 0,
      assignment2: 0,
      assignment3: 0,
      assignment4: 0,
      assignment5: 0,
      attendance: 0,
      total: 0,
    },
  ]);

  // Update a specific field for a student
  const handleInputChange = (index, field, value) => {
    const newResults = [...results];
    newResults[index][field] = parseFloat(value) || 0; // Ensure numeric values
    newResults[index].total = calculateTotal(newResults[index]); // Update total
    setResults(newResults);
  };

  // Calculate total for a student
  const calculateTotal = (student) => {
    return (
      student.term1 +
      student.term2 +
      student.final +
      student.assignment1 +
      student.assignment2 +
      student.assignment3 +
      student.assignment4 +
      student.assignment5 +
      student.attendance
    );
  };

  // Sort by total and assign roll numbers
  const sortAndAssignRoll = () => {
    const sortedResults = [...results].sort((a, b) => b.total - a.total);
    sortedResults.forEach((student, index) => {
      student.roll = index + 1; // Assign roll based on position
    });
    setResults(sortedResults);
  };

  return (
    <div className="result-container">
      <h1>School Results</h1>
      <table className="result-table">
        <thead>
          <tr>
            <th>Roll</th>
            <th>Name</th>
            <th>1st Term</th>
            <th>2nd Term</th>
            <th>Final</th>
            <th>Assignment 1</th>
            <th>Assignment 2</th>
            <th>Assignment 3</th>
            <th>Assignment 4</th>
            <th>Assignment 5</th>
            <th>Attendance</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {results.map((student, index) => (
            <tr key={index}>
              <td>{student.roll}</td>
              <td>{student.name}</td>
              <td>
                <input
                  type="number"
                  value={student.term1}
                  onChange={(e) =>
                    handleInputChange(index, 'term1', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={student.term2}
                  onChange={(e) =>
                    handleInputChange(index, 'term2', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={student.final}
                  onChange={(e) =>
                    handleInputChange(index, 'final', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={student.assignment1}
                  onChange={(e) =>
                    handleInputChange(index, 'assignment1', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={student.assignment2}
                  onChange={(e) =>
                    handleInputChange(index, 'assignment2', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={student.assignment3}
                  onChange={(e) =>
                    handleInputChange(index, 'assignment3', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={student.assignment4}
                  onChange={(e) =>
                    handleInputChange(index, 'assignment4', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={student.assignment5}
                  onChange={(e) =>
                    handleInputChange(index, 'assignment5', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={student.attendance}
                  onChange={(e) =>
                    handleInputChange(index, 'attendance', e.target.value)
                  }
                />
              </td>
              <td>{student.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="sort-button" onClick={sortAndAssignRoll}>
        Sort by Total and Assign Roll
      </button>
    </div>
  );
};

export default Results;
