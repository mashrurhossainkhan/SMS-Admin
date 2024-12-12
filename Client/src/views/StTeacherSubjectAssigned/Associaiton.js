import React, { useState } from 'react';
import AllSubjects from './allSubjects'; // Adjust the path based on your file structure
import StudentUserType from './studentUserType';
import TeacherUserType from './TeacherUserType';

const Association = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  const handleSubjectSelect = (subjectId) => {
    setSelectedSubject(subjectId);
  };

  const handleTeacherSelect = (teacherId) => {
    //teacher Type Id
    setSelectedTeacher(teacherId);
    //console.log('Selected Teacher ID in Association:', teacherId);
  };

  const handleStudentSelect = (studentTypeId) => {
    setSelectedStudent(studentTypeId);
    //console.log('Selected Teacher ID in Association:', teacherId);
  };

  const submitAssociation = (e) => {
    e.preventDefault();
    console.log('selectedSubject: ' + selectedSubject);
    console.log('selectedTeacher: ' + selectedTeacher);
    console.log('selectedStudent: ' + selectedStudent);
  };

  return (
    <div
      className="association-container"
      style={{ backgroundColor: '#ffffff', padding: '20px' }}
    >
      <h1>Associate Subject</h1>
      {/* Subject Selection */}
      <AllSubjects onSelect={handleSubjectSelect} />
      {selectedSubject && (
        <p>
          Selected Subject ID: <strong>{selectedSubject}</strong>
        </p>
      )}

      {/* Teacher Selection */}
      <TeacherUserType onSelect={handleTeacherSelect} />
      {selectedTeacher && (
        <p>
          Selected Teacher: <strong>{selectedTeacher}</strong>
        </p>
      )}

      {/* Student Selection */}
      <StudentUserType onSelect={handleStudentSelect} />
      {selectedStudent && (
        <p>
          Selected Student: <strong>{selectedStudent}</strong>
        </p>
      )}

      <button onClick={submitAssociation}>Associate</button>
    </div>
  );
};

export default Association;
