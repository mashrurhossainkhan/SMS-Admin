import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../actions/api'; // Ensure API base URL is correctly defined
import { TheSidebar } from '../../containers';
import './AddResultType.css';

const AddResultType = () => {
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [resultTypes, setResultTypes] = useState([]);

  // Fetch all result types
  useEffect(() => {
    fetchResultTypes();
  }, []);

  const fetchResultTypes = async () => {
    try {
      const response = await axios.get(`${API}/api/get/all/result/types`);

      console.log(response.data.data);

      // Ensure response is an array
      setResultTypes(
        Array.isArray(response.data.data) ? response.data.data : []
      );
    } catch (error) {
      console.error('Error fetching result types:', error);
      setResultTypes([]); // Fallback to an empty array on error
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!type.trim()) {
      setMessage('Result type is required.');
      return;
    }

    try {
      await axios.post(`${API}/api/add/result/type`, { type });
      alert('✅ Result type added successfully!');
      setType('');
      fetchResultTypes();
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Server error. Please try again.');
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this result type?'))
      return;

    try {
      await axios.delete(`${API}/api/delete/result/type/${id}`);
      alert('❌ Result type deleted successfully!');
      fetchResultTypes(); // Refresh the list
    } catch (error) {
      console.error('Error deleting result type:', error);
      alert('❌ Failed to delete result type.');
    }
  };

  return (
    <>
      <TheSidebar />
      <div className="result-type-container">
        <div className="result-type-form">
          <h2>Add Result Type</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter result type..."
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="result-type-table-container">
          <h2>Result Types</h2>
          {resultTypes.length === 0 ? (
            <p className="text-center text-gray-500">No result types found.</p>
          ) : (
            <table className="result-type-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {resultTypes.map((resultType) => (
                  <tr key={resultType.id}>
                    <td>{resultType.id}</td>
                    <td>{resultType.type}</td>
                    <td>
                      <button onClick={() => handleDelete(resultType.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default AddResultType;
