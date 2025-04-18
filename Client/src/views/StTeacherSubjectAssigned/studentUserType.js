import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AllSubjects.css'; // Import the CSS file
import { fetchStudentByUserTypeActions } from '../../actions/userActions';

const StudentUserType = ({ onSelect }) => {
  const dispatch = useDispatch();

  // Fetch the appropriate user type state from Redux
  const allUserTypeState = useSelector((state) => state.studentbyUserType);
  const { loading, error, studentsStore } = allUserTypeState; // Default to empty array

  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    // Dispatch action to fetch students
    dispatch(fetchStudentByUserTypeActions(2));
  }, [dispatch]);

  const handleUserTypeChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);

    if (onSelect) {
      onSelect(userId); // Pass the selected user ID to the parent
    }
  };

  return (
    <div className="all-subjects-container">
      <h2>Select a Student</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <select
          value={selectedUser}
          onChange={handleUserTypeChange}
          className="all-subjects-container"
        >
          <option value="">-- Select --</option>
          {studentsStore?.map((user) => (
            <option key={user.id} value={user.id}>
              ID: {user.id}, Name: {user.name}, Email: {user.email}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default StudentUserType;
