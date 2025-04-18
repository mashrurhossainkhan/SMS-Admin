import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { API, SchoolName } from '../../actions/api';
import './PaymentTable.css';

const PaymentTable = ({
  filterType = null,
  excludeType = null,
  refreshKey = 0,
  searchComment = '',
}) => {
  const [transactions, setTransactions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const receiptRef = useRef();
  const [selectedPayment, setSelectedPayment] = useState(null);

  const path = window.location.pathname;
  const isDebitPage = path.includes('/payment/debit');
  const API_URL = isDebitPage
    ? `${API}/api/payments/all/debit`
    : `${API}/api/payments/all/credit`;
  const DELETE_URL = isDebitPage ? `${API}/api/debit/` : `${API}/api/credit/`;

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL);
        let fetched = response.data.data;

        if (filterType) fetched = fetched.filter((p) => p.type === filterType);
        if (excludeType)
          fetched = fetched.filter((p) => p.type !== excludeType);

        setPayments(fetched);
        setFilteredPayments(fetched);
      } catch (error) {
        setError('Failed to fetch payment data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [API_URL, filterType, excludeType, refreshKey]);

  useEffect(() => {
    let filtered = [...payments];

    if (typeFilter) {
      filtered = filtered.filter((p) => p.type === typeFilter);
    }

    if (startDate) {
      filtered = filtered.filter(
        (p) => new Date(p.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter((p) => new Date(p.date) <= new Date(endDate));
    }

    if (searchComment) {
      filtered = filtered.filter((p) =>
        p.comment?.toLowerCase().includes(searchComment.toLowerCase())
      );
    }

    setFilteredPayments(filtered);
  }, [typeFilter, startDate, endDate, payments, searchComment]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      await axios.delete(`${DELETE_URL}${id}`);
      setPayments((prev) => prev.filter((p) => p.id !== id));
      alert('Payment deleted successfully!');
    } catch (error) {
      alert('Failed to delete payment.');
    }
  };

  const handlePrint = () => {
    const printContent = receiptRef.current.innerHTML;
    const newWindow = window.open('', '', 'width=800,height=600');
    newWindow.document.write('<html><head><title>Receipt</title>');
    newWindow.document.write(
      '<style>body{font-family:sans-serif;padding:20px;} .signatures{margin-top:40px;display:flex;justify-content:space-between;} .signature-box{width:45%;text-align:center;} .receipt{border:1px solid #ddd;padding:20px;} table{width:100%;border-collapse:collapse;} td{padding:8px 0;} .title{font-weight:bold;}</style>'
    );
    newWindow.document.write('</head><body>');
    newWindow.document.write(printContent);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
  };

  const uniqueTypes = [...new Set(payments.map((p) => p.type))];

  return (
    <div className="container">
      <h2 className="table-title">
        {isDebitPage ? 'Debit Transactions' : 'Credit Transactions'}
      </h2>

      <div
        className="filters"
        style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <label htmlFor="type-select">Filter by Type:</label>
          <select
            id="type-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ padding: '6px', marginLeft: '8px' }}
          >
            <option value="">All</option>
            {uniqueTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ marginLeft: '6px', padding: '6px' }}
          />
        </div>

        <div>
          <label>To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ marginLeft: '6px', padding: '6px' }}
          />
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="payment-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Name</th>
              <th>Email</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td>{payment.id}</td>
                  <td>{payment.type}</td>
                  <td>{payment.amount.toFixed(2)}</td>
                  <td>{payment.user_name}</td>
                  <td>{payment.user_email}</td>
                  <td>{payment.comment || 'N/A'}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(payment.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="print-btn"
                      onClick={() => {
                        setSelectedPayment(payment);
                        setTimeout(() => handlePrint(), 100);
                      }}
                      style={{ marginLeft: '8px' }}
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {selectedPayment && (
        <div style={{ display: 'none' }}>
          <div ref={receiptRef} className="receipt">
            <h1>{SchoolName}</h1>
            <h3>Payment Receipt</h3>
            <table>
              <tbody>
                <tr>
                  <td className="title">Date:</td>
                  <td>{new Date(selectedPayment.date).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td className="title">Transaction ID:</td>
                  <td>{selectedPayment.id}</td>
                </tr>
                <tr>
                  <td className="title">Type:</td>
                  <td>{selectedPayment.type}</td>
                </tr>
                <tr>
                  <td className="title">Amount:</td>
                  <td>${selectedPayment.amount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="title">Name:</td>
                  <td>{selectedPayment.user_name}</td>
                </tr>
                <tr>
                  <td className="title">Email:</td>
                  <td>{selectedPayment.user_email}</td>
                </tr>
                <tr>
                  <td className="title">Comment:</td>
                  <td>{selectedPayment.comment || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
            <div className="signatures">
              <div className="signature-box">
                _______________________
                <br />
                Customer Signature
              </div>
              <div className="signature-box">
                _______________________
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

export default PaymentTable;
