import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSubjectsActions } from '../../actions/subjectActions';
import './AllSubjects.css'; // Import the CSS file

const AllSubjects = ({ onSelect }) => {
  const dispatch = useDispatch();
  const allSubjectsState = useSelector((state) => state.allSubjects);
  const { loading, error, subjects } = allSubjectsState;

  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    dispatch(allSubjectsActions());
  }, [dispatch]);

  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    setSelectedSubject(subjectId);

    if (onSelect) {
      onSelect(subjectId); // Pass the selected subject ID to the parent
    }
  };

  return (
    <div className="all-subjects-container">
      <h2>Select a Subject</h2>
      {loading ? (
        <p>Loading subjects...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <select
          value={selectedSubject}
          onChange={handleSubjectChange}
          className="subjects-dropdown"
        >
          <option value="">-- Select Subject --</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              id: {subject.name} - name: {subject.name} - class: {subject.class}{' '}
              - section: {subject.section}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default AllSubjects;
