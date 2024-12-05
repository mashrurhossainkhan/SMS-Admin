import React, { useState } from 'react';
import AllSubjects from './allSubjects'; // Adjust the path based on your file structure

const Association = () => {
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleSubjectSelect = (subjectId) => {
    setSelectedSubject(subjectId);
    console.log('Selected Subject ID in Association:', subjectId);
  };

  return (
    <div className="association-container">
      <h1>Associate Subject</h1>
      <AllSubjects onSelect={handleSubjectSelect} />
      {selectedSubject && (
        <p>
          Selected Subject ID: <strong>{selectedSubject}</strong>
        </p>
      )}
    </div>
  );
};

export default Association;
