import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSubjectsActions } from '../../actions/subjectActions';
import './AllSubjects.css'; // Import the CSS file

const AllSubjects = () => {
  const dispatch = useDispatch();

  // Fetch subjects from Redux state
  const allSubjectsState = useSelector((state) => state.allSubjects);
  const { loading, error, subjects } = allSubjectsState;

  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    // Fetch all subjects when the component mounts
    dispatch(allSubjectsActions());
  }, [dispatch]);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    console.log('Selected Subject ID:', e.target.value);
  };

  return (
    <div className="all-subjects-container">
      <h2>Select a Subject</h2>
      {loading ? (
        <p className="loading-text">Loading subjects...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <select
          value={selectedSubject}
          onChange={handleSubjectChange}
          className="subjects-dropdown"
        >
          <option value="">-- Select Subject --</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name} ({subject.class} - {subject.section})
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default AllSubjects;
