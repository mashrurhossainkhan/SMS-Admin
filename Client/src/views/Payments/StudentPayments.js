import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentPayment.css'; // Import the CSS file for styling
import { API } from '../../actions/api';

const StudentPayment = () => {
  const [students, setStudents] = useState([]);

  // Fetch students data from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(API+'/api/users/type/2');
        // Assuming the response data contains the array of students
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handlePaid = (studentId) => {
    console.log(`Paid for student ID: ${studentId}`);
  };

  return (
    <div className="student-payment-container">
      <h1>Student Payment</h1>
      <div className="student-card-list">
        {students.length > 0 ? (
          students.map((student) => (
            <div key={student.id} className="student-card">
              <h2>{student.name}</h2>
              <p>
                <strong>Student Software ID:</strong> {student.id}
              </p>
              <p>
                <strong>Email:</strong> {student.email}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(student.createdAt).toLocaleDateString()}
              </p>
              <button
                className="paid-button"
                onClick={() => handlePaid(student.id)}
              >
                Paid
              </button>
            </div>
          ))
        ) : (
          <p>Loading students...</p>
        )}
      </div>
    </div>
  );
};

export default StudentPayment;
