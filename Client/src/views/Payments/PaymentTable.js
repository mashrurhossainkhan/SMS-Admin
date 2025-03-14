import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../actions/api';
import './PaymentTable.css';
const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine API endpoint based on frontend URL
  const path = window.location.pathname;
  const isDebitPage = path.includes('/payment/debit');
  const API_URL = isDebitPage
    ? API + '/api/payments/all/debit'
    : API + '/api/payments/all/credit';

  const DELETE_URL = isDebitPage
    ? API + '/api/debit/' // Debit delete API
    : API + '/api/credit/'; // Credit delete API

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(API_URL);
        setPayments(response.data.data);
      } catch (error) {
        setError('Failed to fetch payment data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [API_URL]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this record?'
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${DELETE_URL}${id}`);
      setPayments(payments.filter((payment) => payment.id !== id));
      alert('Payment deleted successfully!');
    } catch (error) {
      alert('Failed to delete payment.');
    }
  };

  return (
    <div className="container">
      <h2 className="table-title">
        {isDebitPage ? 'Debit Transactions' : 'Credit Transactions'}
      </h2>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="payment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>User</th>
              <th>Email</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.type}</td>
                  <td>${payment.amount.toFixed(2)}</td>
                  <td>{payment.user_name}</td>
                  <td>{payment.user_email}</td>
                  <td>{payment.comment || 'N/A'}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="actions-column">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(payment.id)}
                    >
                      Delete
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
    </div>
  );
};

export default PaymentTable;
