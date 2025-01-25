import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentPayment.css'; // Import the CSS file for styling
import { API } from '../../actions/api';

const StudentPayment = () => {
  const [students, setStudents] = useState([]);
  const [amounts, setAmounts] = useState({}); // State to store amounts for each student

  // Fetch students data from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API}/api/users/type/2`);
        // Assuming the response data contains the array of students
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handlePaid = async (studentId) => {
    const amount = amounts[studentId];

    // Validate amount
    if (!amount) {
      alert('Amount is required before making a payment.');
      return;
    }

    try {
      // Prepare the payload
      const payload = {
        userId: studentId,
        amount: parseFloat(amount),
        type: 'monthly payment',
        comment: 'Monthly payment made via UI', // Optional comment
      };

      // Make the POST request
      const response = await axios.post(`${API}/api/payments/add/credit`, payload);

      // Log the response or show a success message
      console.log('Payment successful:', response.data);
      alert('Payment successful!');
    } catch (error) {
      console.error('Error making payment:', error);
      alert('Failed to make payment. Please try again.');
    }
  };

  const handleAmountChange = (studentId, value) => {
    setAmounts((prev) => ({
      ...prev,
      [studentId]: value, // Update the amount for the specific student
    }));
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
              <div className="amount-input">
                <label>
                  <strong>Amount:</strong>
                  <input
                    type="number"
                    value={amounts[student.id] || ''} // Default to an empty string if no value is set
                    onChange={(e) => handleAmountChange(student.id, e.target.value)}
                    placeholder="Enter amount"
                    required
                  />
                </label>
              </div>
              <button
                className="paid-button"
                onClick={() => handlePaid(student.id)}
                disabled={!amounts[student.id]} // Disable the button if no amount is entered
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
