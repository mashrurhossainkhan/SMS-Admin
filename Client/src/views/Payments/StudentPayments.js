import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentPayment.css'; // Import the CSS file for styling
import { API } from '../../actions/api';
import { useLocation } from 'react-router-dom';
import PaymentTable from './PaymentTable';

const StudentPayment = () => {
  const location = useLocation(); // Get the current route
  const [activeTab, setActiveTab] = useState('students'); // State to control the active tab
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [amounts, setAmounts] = useState({}); // State to store amounts for each student
  const [dates, setDates] = useState({}); // State to store dates for each student
  const [history, setHistory] = useState([]); // State to store payment history
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedStudent, setSelectedStudent] = useState(null); // State for selected student
  const storedData = localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK');
  const userId = storedData ? JSON.parse(storedData).userId : null;

  // State for the credit form on the Others tab
  const [creditForm, setCreditForm] = useState({
    userId: userId,
    amount: '',
    type: '',
    comment: '',
    date: '',
  });

  // Fetch students data from the API
  useEffect(() => {
    if (activeTab === 'students') {
      let userType;

      if (location.pathname.includes('/payment/debit')) {
        userType = 3;
      } else if (location.pathname.includes('/payments/credit')) {
        userType = 2;
      } else {
        return; // Exit if no valid condition is met
      }

      const fetchUsers = async () => {
        try {
          const response = await axios.get(`${API}/api/users/type/${userType}`);
          setStudents(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();
    }
  }, [activeTab, location.pathname]);

  // Filter students based on the search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toString().includes(searchQuery) // Assuming student ID is numeric
  );

  const handlePaid = async (Id) => {
    const amount = amounts[Id];
    const date = dates[Id];

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
        userId: Id,
        amount: parseFloat(amount),
        type: 'monthly payment',
        comment: 'Monthly payment made via UI by ' + userId, // Optional comment
        date, // Date from the frontend
      };

      // Determine API endpoint dynamically
      let endpoint = '';
      if (location.pathname.includes('/payment/debit')) {
        endpoint = `${API}/api/payments/add/debit`;
      } else if (location.pathname.includes('/payments/credit')) {
        endpoint = `${API}/api/payments/add/credit`;
      } else {
        alert('Invalid payment type.');
        return;
      }

      const response = await axios.post(endpoint, payload);

      console.log('Payment successful:', response.data);
      alert('Payment successful!');
      // Clear amount and date for the student after successful payment
      setAmounts((prev) => ({ ...prev, [Id]: '' }));
      setDates((prev) => ({ ...prev, [Id]: '' }));
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

  const fetchHistory = async (id) => {
    let endpoint = '';

    // Determine API endpoint based on location
    if (location.pathname.includes('/payment/debit')) {
      endpoint = `${API}/api/payments/history/debit/${id}`;
    } else if (location.pathname.includes('/payments/credit')) {
      endpoint = `${API}/api/payments/history/${id}`;
    } else {
      alert('Invalid payment type.');
      return;
    }

    try {
      const response = await axios.get(endpoint);
      setHistory(response.data); // Set fetched history
      setSelectedStudent(id); // Set selected student for context
      setIsModalOpen(true); // Open modal
    } catch (error) {
      console.error('Error fetching history:', error);
      alert('No Payment History');
    }
  };

  const deleteRecord = async (recordId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this record?'
    );
    if (!confirmDelete) {
      return; // Exit if the user cancels the action
    }

    try {
      await axios.delete(`${API}/api/credits/${recordId}`);
      setHistory((prevHistory) =>
        prevHistory.filter((entry) => entry.id !== recordId)
      ); // Update UI
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
    const { userId, amount, type, date, comment } = creditForm;

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
        comment: 'Custom payment input by ' + userId, // Optional comment
        date,
      };

      // Determine API endpoint dynamically
      let endpoint = '';
      if (location.pathname.includes('/payment/debit')) {
        endpoint = `${API}/api/payments/add/debit`;
      } else if (location.pathname.includes('/payments/credit')) {
        endpoint = `${API}/api/payments/add/credit`;
      } else {
        alert('Invalid payment type.');
        return;
      }

      const response = await axios.post(endpoint, payload);
      console.log('Payment submission successful:', response.data);
      alert('Payment submission successful!');

      // Reset the credit form
      setCreditForm({
        userId: '',
        amount: '',
        type: '',
        comment: '',
        date: '',
      });
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Failed to submit payment. Please try again.');
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
          <input
            type="text"
            placeholder="Search by name, email, or software ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px',
              outline: 'none',
            }}
          />

          <div className="student-card-list">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
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
                        onChange={(e) =>
                          handleAmountChange(student.id, e.target.value)
                        }
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
                        onChange={(e) =>
                          handleDateChange(student.id, e.target.value)
                        }
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
          <h1>Others - Input</h1>
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
                  disabled
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
            <button type="submit">Submit</button>
          </form>

          <PaymentTable />
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
                    {new Date(entry.date).toLocaleDateString()}: ${entry.amount}{' '}
                    - {entry.type}
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
