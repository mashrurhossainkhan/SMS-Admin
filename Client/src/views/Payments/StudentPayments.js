import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentPayment.css'; // Import the CSS file for styling
import { API } from '../../actions/api';

const StudentPayment = () => {
  const [activeTab, setActiveTab] = useState('students'); // State to control the active tab
  const [students, setStudents] = useState([]);
  const [amounts, setAmounts] = useState({}); // State to store amounts for each student
  const [dates, setDates] = useState({}); // State to store dates for each student
  const [history, setHistory] = useState([]); // State to store payment history
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedStudent, setSelectedStudent] = useState(null); // State for selected student

  // State for the credit form on the Others tab
  const [creditForm, setCreditForm] = useState({
    userId: localStorage.getItem("3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK"),
    amount: '',
    type: '',
    comment: '',
    date: ''
  });

  // Fetch students data from the API
  useEffect(() => {
    if (activeTab === 'students') {
      const fetchStudents = async () => {
        try {
          const response = await axios.get(`${API}/api/users/type/2`);
          setStudents(response.data);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };

      fetchStudents();
    }
  }, [activeTab]);

  const handlePaid = async (studentId) => {
    const amount = amounts[studentId];
    const date = dates[studentId];

    // Validate amount and date
    if (!amount) {
      alert('Amount is required before making a payment.');
      return;
    }
    if (!date) {
      alert('Date is required before making a payment.');
      return;
    }

    try {
      const payload = {
        userId: studentId,
        amount: parseFloat(amount),
        type: 'monthly payment',
        comment: 'Monthly payment made via UI', // Optional comment
        date, // Date from the frontend
      };

      const response = await axios.post(`${API}/api/payments/add/credit`, payload);

      console.log('Payment successful:', response.data);
      alert('Payment successful!');
      // Clear amount and date for the student after successful payment
      setAmounts((prev) => ({ ...prev, [studentId]: '' }));
      setDates((prev) => ({ ...prev, [studentId]: '' }));
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

  const handleDateChange = (studentId, value) => {
    setDates((prev) => ({
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

  // Handlers for the credit form on the Others tab
  const handleCreditFormChange = (e) => {
    const { name, value } = e.target;
    setCreditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreditSubmit = async (e) => {
    e.preventDefault();
    const { userId, amount, type, date } = creditForm;
    // Validate required fields
    if (!userId || !amount || !type || !date) {
      alert('User ID, amount, type, and date are required.');
      return;
    }
    try {
      const payload = {
        userId,
        amount: parseFloat(amount),
        type,
        comment: creditForm.comment || null,
        date,
      };
      const response = await axios.post(`${API}/api/payments/add/credit`, payload);
      console.log('Credit submission successful:', response.data);
      alert('Credit submission successful!');
      // Reset the credit form
      setCreditForm({
        userId: '',
        amount: '',
        type: '',
        comment: '',
        date: ''
      });
    } catch (error) {
      console.error('Error submitting credit:', error);
      alert('Failed to submit credit. Please try again.');
    }
  };

  return (
    <div className="student-payment-container">
      {/* Tab Buttons */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Students Payments
        </button>
        <button
          className={`tab-button ${activeTab === 'others' ? 'active' : ''}`}
          onClick={() => setActiveTab('others')}
        >
          Others
        </button>
      </div>

      {/* Students Payments Page */}
      {activeTab === 'students' && (
        <div className="student-payments-page">
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
                    <strong>Created At:</strong>{' '}
                    {new Date(student.createdAt).toLocaleDateString()}
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
                  <div className="date-input">
                    <label>
                      <strong>Date:</strong>
                      <input
                        type="date"
                        value={dates[student.id] || ''}
                        onChange={(e) => handleDateChange(student.id, e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <button
                    className="paid-button"
                    onClick={() => handlePaid(student.id)}
                    disabled={!amounts[student.id] || !dates[student.id]}
                  >
                    Paid
                  </button>
                  <button
                    className="paid-button"
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
        </div>
      )}

      {/* Others Page - Credit Input Form */}
      {activeTab === 'others' && (
        <div className="others-page">
          <h1>Others - Credit Input</h1>
          <form onSubmit={handleCreditSubmit} className="credit-form">
            <div className="form-group">
              <label>
                User ID:
                <input
                  type="text"
                  name="userId"
                  value={creditForm.userId}
                  onChange={handleCreditFormChange}
                  placeholder="Enter User ID"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Amount:
                <input
                  type="number"
                  name="amount"
                  value={creditForm.amount}
                  onChange={handleCreditFormChange}
                  placeholder="Enter amount"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Type:
                <input
                  type="text"
                  name="type"
                  value={creditForm.type}
                  onChange={handleCreditFormChange}
                  placeholder="Enter type"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={creditForm.date}
                  onChange={handleCreditFormChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Comment:
                <textarea
                  name="comment"
                  value={creditForm.comment}
                  onChange={handleCreditFormChange}
                  placeholder="Optional comment"
                />
              </label>
            </div>
            <button type="submit">Submit Credit</button>
          </form>
        </div>
      )}

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
