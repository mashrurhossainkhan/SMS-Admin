import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeeTable.css';
import { API } from '../../actions/api';

const FeeTable = () => {
  const [fees, setFees] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedClass, setEditedClass] = useState('');
  const [editedFee, setEditedFee] = useState('');

  const fetchFees = async () => {
    try {
      const response = await axios.get(API + '/api/fees');
      setFees(response.data.data);
    } catch (error) {
      console.error('Error fetching fees:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this fee?')) return;

    try {
      await axios.delete(API + `/api/fees/${id}`);
      fetchFees();
    } catch (error) {
      console.error('Error deleting fee:', error);
    }
  };

  const startEditing = (fee) => {
    setEditId(fee.id);
    setEditedClass(fee.class);
    setEditedFee(fee.fees);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditedClass('');
    setEditedFee('');
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(API + `/api/fees/${id}`, {
        class: editedClass,
        fees: editedFee,
      });
      cancelEdit();
      fetchFees();
    } catch (error) {
      console.error('Error updating fee:', error);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  return (
    <div className="fee-table-container">
      <h2>Fees List</h2>
      <table className="fee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Class</th>
            <th>Fees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee.id}>
              <td>{fee.id}</td>
              <td>
                {editId === fee.id ? (
                  <input
                    type="text"
                    value={editedClass}
                    onChange={(e) => setEditedClass(e.target.value)}
                  />
                ) : (
                  fee.class
                )}
              </td>
              <td>
                {editId === fee.id ? (
                  <input
                    type="number"
                    value={editedFee}
                    onChange={(e) => setEditedFee(e.target.value)}
                  />
                ) : (
                  fee.fees
                )}
              </td>
              <td>
                {editId === fee.id ? (
                  <>
                    <button onClick={() => handleUpdate(fee.id)}>
                      ✅ Save
                    </button>
                    <button onClick={cancelEdit}>❌ Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(fee)}>✏️ Edit</button>
                    <button onClick={() => handleDelete(fee.id)}>
                      🗑️ Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {fees.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No fee records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeeTable;
