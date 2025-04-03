import React, { useState } from 'react';
import axios from 'axios';
import './FeeForm.css'; // Assuming you store custom CSS here
import { API } from '../../actions/api';
import FeeTable from './FeeTable';

const FeeForm = () => {
  const [className, setClassName] = useState('');
  const [fees, setFees] = useState('');
  const [message, setMessage] = useState('');
  const [tableKey, setTableKey] = useState(0); // ✅ Key to force re-render

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API + '/api/fees', {
        class: className,
        fees: parseInt(fees),
      });

      setMessage(response.data.message);
      setClassName('');
      setFees('');
      setTableKey(prev => prev + 1); // ✅ Force FeeTable to remount and fetch again
    } catch (error) {
      const err = error?.response?.data?.error || 'Something went wrong!';
      setMessage(`❌ ${err}`);
    }
  };

  return (
    <div className="fee-form-container">
      <h2 className="form-title">Add New Fee</h2>
      <form onSubmit={handleSubmit} className="fee-form">
        <div className="form-group">
          <label>Class:</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Fees:</label>
          <input
            type="number"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      
      {/* ✅ FeeTable will re-render when `key` changes */}
      <FeeTable key={tableKey} />
      
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default FeeForm;
