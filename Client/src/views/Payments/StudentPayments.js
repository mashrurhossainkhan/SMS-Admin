import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentPayment.css'; // Import the CSS file for styling
import { API, SchoolName } from '../../actions/api';
import { useLocation } from 'react-router-dom';
import PaymentTable from './PaymentTable';
import { useRef } from 'react';

const StudentPayment = () => {
  const receiptRef = useRef();
  const [lastPaidAmount, setLastPaidAmount] = useState('');
  const [lastPaidMonths, setLastPaidMonths] = useState('');
  const [lastPaidDate, setLastPaidDate] = useState('');

  const [lastPaidStudent, setLastPaidStudent] = useState(null);
  const today = new Date().toISOString().split('T')[0];
  const location = useLocation(); // Get the current route
  const isCreditPage = location.pathname.includes('/payments/credit');
  const [activeTab, setActiveTab] = useState('students'); // State to control the active tab
  const [students, setStudents] = useState([]);
  const [classFees, setClassFees] = useState({});
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [amounts, setAmounts] = useState({}); // State to store amounts for each student
  const [dates, setDates] = useState({}); // State to store dates for each student
  const [history, setHistory] = useState([]); // State to store payment history
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedStudent, setSelectedStudent] = useState(null); // State for selected student
  const [comments, setComments] = useState({});
  const [transactionSearch, setTransactionSearch] = useState('');

  const storedData = localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK');
  const storedToken = localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK');
  let userId = null;
  let tokenEmail = null;

  if (storedToken) {
    try {
      const parsed = JSON.parse(storedToken);
      const token = parsed?.token;
      if (token) {
        const base64Payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        userId = decodedPayload.userId;
        tokenEmail = decodedPayload.email;
      }
    } catch (err) {
      console.error('Error decoding token:', err);
    }
  }

  // State for the credit form on the Others tab
  const [creditForm, setCreditForm] = useState({
    userId: userId,
    amount: '',
    type: '',
    comment: '',
    date: '',
  });

  const handlePrint = () => {
    const content = receiptRef.current.innerHTML;
    const win = window.open('', '', 'width=800,height=600');
    win.document.write('<html><head><title>Receipt</title>');
    win.document.write(`<style>
      body { font-family: Arial; padding: 20px; }
      .signatures { margin-top: 40px; display: flex; justify-content: space-between; }
      .signature-box { width: 45%; text-align: center; }
      table { width: 100%; margin-top: 20px; }
      td { padding: 6px 0; }
    </style>`);
    win.document.write('</head><body>');
    win.document.write(content);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  };

  // Fetch students data from the API
  useEffect(() => {
    if (activeTab === 'students') {
      let userType;

      if (location.pathname.includes('/payment/debit')) {
        userType = 3;
      } else if (location.pathname.includes('/payments/credit')) {
        const fetchFees = async () => {
          try {
            const response = await axios.get(`${API}/api/fees`);
            const feeMap = {};
            response.data.data.forEach((fee) => {
              feeMap[fee.class] = fee.fees;
            });
            setClassFees(feeMap);
          } catch (err) {
            console.error('Error fetching fees by class:', err);
          }
        };

        fetchFees();
        userType = 2;
      } else {
        return; // Exit if no valid condition is met
      }

      const fetchUsers = async () => {
        try {
          const response = await axios.get(`${API}/api/users/type/${userType}`);
          const users = response.data;

          // Fetch studentmeta for each user
          const usersWithMeta = await Promise.all(
            users.map(async (user) => {
              try {
                const metaRes = await axios.get(
                  `${API}/api/student/meta/get/${user.id}`
                );
                return { ...user, meta: metaRes.data }; // Attach meta
              } catch (err) {
                console.warn(`Meta not found for user ${user.id}`);
                return { ...user, meta: null };
              }
            })
          );

          setStudents(usersWithMeta);
        } catch (error) {
          console.error('Error fetching users or metadata:', error);
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
    const student = students.find((s) => s.id === Id);
    const studentClass = student?.meta?.data?.class;

    const amount =
      amounts[Id] !== undefined ? amounts[Id] : classFees[studentClass];
    const date = dates[Id] || today;

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
      let payload;
      // Determine API endpoint dynamically
      let endpoint = '';
      if (location.pathname.includes('/payment/debit')) {
        endpoint = `${API}/api/payments/add/debit`;
        payload = {
          userId: Id,
          amount: parseFloat(amount),
          type: 'monthly payment',
          comment:
            'Teacher id : months: ' +
            JSON.stringify(comments) + // Optional comment
            'Monthly payment made via UI by ' +
            tokenEmail,
          date, // Date from the frontend
        };
      } else if (location.pathname.includes('/payments/credit')) {
        endpoint = `${API}/api/payments/add/credit`;
        payload = {
          userId: Id,
          amount: parseFloat(amount),
          type: 'monthly payment',
          comment:
            'Student id : months: ' +
            JSON.stringify(comments) + // Optional comment
            'Monthly payment made via UI by ' +
            tokenEmail,
          date, // Date from the frontend
        };
      } else {
        alert('Invalid payment type.');
        return;
      }

      const response = await axios.post(endpoint, payload);

      setLastPaidStudent(student);
      setLastPaidAmount(amount);
      setLastPaidMonths(comments[Id]);
      setLastPaidDate(date);

      setTimeout(() => handlePrint(), 100); // ensure DOM updates before print

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
      'Are you sure you want to delete this record?' + recordId
    );
    if (!confirmDelete) {
      return; // Exit if the user cancels the action
    }

    try {
      await axios.delete(`${API}/api/credit/${recordId}`);
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
    e.preventDefault();
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
        comment: 'Custom payment input by ' + tokenEmail, // Optional comment
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
          {location.pathname.includes('/payment/debit')
            ? 'Teacher Monthly Payment'
            : 'Student Monthly Payment'}
        </button>
        <button
          className={`tab-button ${activeTab === 'others' ? 'active' : ''}`}
          onClick={() => setActiveTab('others')}
        >
          Others
        </button>
        <button
          className={`tab-button ${
            activeTab === 'alltransactions' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('allTransactions')}
        >
          Show All Transactions
        </button>
      </div>

      {/* Students Payments Page */}
      {activeTab === 'students' && (
        <div className="student-payments-page">
          <h1>
            {location.pathname.includes('/payment/debit')
              ? 'Teacher Monthly Payment'
              : 'Student Monthly Payment'}
          </h1>

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
                  {location.pathname.includes('/payments/credit') && (
                    <>
                      <p>
                        <strong>Roll No:</strong>{' '}
                        {student.meta?.data?.rollNo || 'N/A'}
                      </p>
                      <p>
                        <strong>Class:</strong>{' '}
                        {student.meta?.data?.class || 'N/A'}
                      </p>
                      <p>
                        <strong>Section:</strong>{' '}
                        {student.meta?.data?.section || 'N/A'}
                      </p>
                    </>
                  )}
                  <p>
                    <strong>Email:</strong> {student.email}
                  </p>
                  <div className="amount-input">
                    <label>
                      <strong>Amount:</strong>
                      <input
                        type="number"
                        value={
                          amounts[student.id] !== undefined
                            ? amounts[student.id]
                            : classFees[student.meta?.data?.class] || ''
                        }
                        onChange={(e) =>
                          handleAmountChange(student.id, e.target.value)
                        }
                        placeholder={`Default: ${
                          classFees[student.meta?.data?.class] || 'Enter amount'
                        }`}
                        required
                        disabled={isCreditPage}
                      />
                    </label>
                  </div>

                  <div className="month-input">
                    <label>
                      <strong>Month(s):</strong>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px',
                        }}
                      >
                        {[
                          'January',
                          'February',
                          'March',
                          'April',
                          'May',
                          'June',
                          'July',
                          'August',
                          'September',
                          'October',
                          'November',
                          'December',
                        ].map((month) => {
                          const selectedMonths = comments[student.id]
                            ? comments[student.id].split(', ')
                            : [];

                          const isChecked = selectedMonths.includes(month);

                          const toggleMonth = () => {
                            const updatedMonths = isChecked
                              ? selectedMonths.filter((m) => m !== month)
                              : [...selectedMonths, month];

                            setComments((prev) => ({
                              ...prev,
                              [student.id]: updatedMonths.join(', '),
                            }));
                          };

                          return (
                            <label
                              key={month}
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={toggleMonth}
                              />
                              {month}
                            </label>
                          );
                        })}
                      </div>
                    </label>

                    <label style={{ marginTop: '8px', display: 'block' }}>
                      <input
                        type="text"
                        value={comments[student.id] || ''}
                        onChange={(e) =>
                          setComments((prev) => ({
                            ...prev,
                            [student.name]: e.target.value,
                          }))
                        }
                        placeholder="Selected months will appear here"
                        style={{
                          width: '100%',
                          padding: '6px',
                          marginTop: '4px',
                        }}
                      />
                    </label>
                  </div>

                  <div className="date-input">
                    <label>
                      <strong>Date:</strong>
                      <input
                        type="date"
                        value={dates[student.id] || today}
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
                    disabled={
                      !(
                        (amounts[student.id] !== undefined
                          ? amounts[student.id]
                          : classFees[student.meta?.data?.class]) &&
                        (dates[student.id] || today) &&
                        comments[student.id] &&
                        comments[student.id].trim() !== ''
                      )
                    }
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
      {activeTab === 'allTransactions' && (
        <div style={{ margin: '16px 0' }}>
          <input
            type="text"
            placeholder="Search by comment (e.g., January)"
            value={transactionSearch}
            onChange={(e) => setTransactionSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '16px',
            }}
          />
        </div>
      )}

      {activeTab === 'allTransactions' && (
        <PaymentTable searchComment={transactionSearch} />
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

      {lastPaidStudent && (
        <div style={{ display: 'none' }}>
          <div ref={receiptRef}>
            <h1>{SchoolName}</h1>
            <h2>Payment Receipt</h2>
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>Name:</strong>
                  </td>
                  <td>{lastPaidStudent.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>ID:</strong>
                  </td>
                  <td>{lastPaidStudent.id}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email:</strong>
                  </td>
                  <td>{lastPaidStudent.email}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Class:</strong>
                  </td>
                  <td>{lastPaidStudent.meta?.data?.class}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Amount:</strong>
                  </td>
                  <td>{lastPaidAmount}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Months:</strong>
                  </td>
                  <td>{lastPaidMonths}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Date:</strong>
                  </td>
                  <td>{lastPaidDate}</td>
                </tr>

                <tr>
                  <td>
                    <strong>Paid by:</strong>
                  </td>
                  <td>{tokenEmail}</td>
                </tr>
              </tbody>
            </table>
            <div
              className="signatures"
              style={{
                marginTop: '50px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div className="signature-box">
                ______________________
                <br />
                Customer Signature
              </div>
              <div className="signature-box">
                ______________________
                <br />
                Authority Signature
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPayment;
