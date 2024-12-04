import React from 'react';
import './StudentPayment.css'; // Import the CSS file for styling

const StudentPayment = () => {
  const students = [
    {
      id: 1,
      name: 'John Doe',
      class: '10',
      section: 'A',
      roll: '5',
      parentDetails: 'Mr. and Mrs. Doe',
    },
    {
      id: 2,
      name: 'Jane Smith',
      class: '9',
      section: 'B',
      roll: '12',
      parentDetails: 'Mr. and Mrs. Smith',
    },
    {
      id: 3,
      name: 'Emily Johnson',
      class: '8',
      section: 'C',
      roll: '20',
      parentDetails: 'Ms. Johnson',
    },
  ];

  const handlePaid = (studentId) => {
    console.log(`Paid for student ID: ${studentId}`);
  };

  return (
    <div className="student-payment-container">
      <h1>Student Payment</h1>
      <div className="student-card-list">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <h2>{student.name}</h2>
            <p>
              <strong>Class:</strong> {student.class}
            </p>
            <p>
              <strong>Section:</strong> {student.section}
            </p>
            <p>
              <strong>Roll:</strong> {student.roll}
            </p>
            <p>
              <strong>Parent Details:</strong> {student.parentDetails}
            </p>
            <button
              className="paid-button"
              onClick={() => handlePaid(student.id)}
            >
              Paid
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentPayment;
