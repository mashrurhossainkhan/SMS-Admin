import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentPayment.css'; // Import the CSS file for styling
import { API } from '../../actions/api';

const StudentPayment = () => {
  const [students, setStudents] = useState([]);
  const [amounts, setAmounts] = useState({}); // State to store amounts for each student
  const [history, setHistory] = useState([]); // State to store payment history
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedStudent, setSelectedStudent] = useState(null); // State for selected student

  // Fetch students data from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API}/api/users/type/2`);
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
      const payload = {
        userId: studentId,
        amount: parseFloat(amount),
        type: 'monthly payment',
        comment: 'Monthly payment made via UI', // Optional comment
      };

      const response = await axios.post(`${API}/api/payments/add/credit`, payload);

      console.log('Payment successful:', response.data);
      alert('Payment successful!');
      setAmounts("");
    } catch (error) {
      console.error('Error making payment:', error);
      alert('Failed to make payment. Please try again.');
    }
  };

  const handleAmountChange = (studentId, value) => {
    setAmounts((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const fetchHistory = async (studentId) => {
    try {
      const response = await axios.get(`${API}/api/payments/history/${studentId}`);
      setHistory(response.data); // Set fetched history
      setSelectedStudent(studentId); // Set selected student for context
      setIsModalOpen(true); // Open modal
    } catch (error) {
      console.error('Error fetching history:', error);
      alert('Failed to fetch payment history. Please try again.');
    }
  };

  const deleteRecord = async (recordId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');
    if (!confirmDelete) {
      return; // Exit if the user cancels the action
    }

    try {
      await axios.delete(`${API}/api/credits/${recordId}`);
      setHistory((prevHistory) => prevHistory.filter((entry) => entry.id !== recordId)); // Update UI
      alert('Record deleted successfully!');
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Failed to delete record. Please try again.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setHistory([]);
    setSelectedStudent(null);
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
                    value={amounts[student.id] || ''}
                    onChange={(e) => handleAmountChange(student.id, e.target.value)}
                    placeholder="Enter amount"
                    required
                  />
                </label>
              </div>
              <button
                className="paid-button"
                onClick={() => handlePaid(student.id)}
                disabled={!amounts[student.id]}
              >
                Paid
              </button>
              <button
                className="history-button"
                onClick={() => fetchHistory(student.id)}
              >
                Previous History
              </button>
            </div>
          ))
        ) : (
          <p>Loading students...</p>
        )}
      </div>

      {/* Modal for Payment History */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h2>Payment History</h2>
            <p>
              <strong>Student ID:</strong> {selectedStudent}
            </p>
            {history.length > 0 ? (
              <ul>
                {history.map((entry) => (
                  <li key={entry.id} className="history-item">
                    {new Date(entry.date).toLocaleDateString()}: ${entry.amount} - {entry.type}
                    <span
                      className="delete-record"
                      onClick={() => deleteRecord(entry.id)}
                    >
                      &times;
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No payment history available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPayment;
