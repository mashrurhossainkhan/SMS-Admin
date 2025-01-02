import React, { useState } from 'react';
import AllSubjects from './allSubjects'; // Adjust the path based on your file structure
import StudentUserType from './studentUserType';
import TeacherUserType from './TeacherUserType';
import axios from 'axios';
import { API } from '../../actions/api';

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

  const submitAssociation = async (e) => {

    // Prepare data to send to the API
    const data = {
      studentId: selectedStudent,
      teacherId: selectedTeacher,
      subjectId: selectedSubject,
    };
  
    try {
      // Send POST request to the API
      const response = await axios.post(API+'/api/teacher-subject-association', data);
  
      alert('Association created successfully!');
    } catch (error) {
      // Log and handle errors
      console.error('Error:', error.response?.data || error.message);
      alert('Failed to create association. Please try again.');
    }
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
    <button
      style={{
        display: "block", // Ensures the button takes up a full line, enabling centering
        margin: "0 auto", // Centers horizontally
        backgroundColor: "white", // White background
        border: "1px solid lightgray", // Light black border
        color: "black", // Black text color
        padding: "10px 20px", // Padding for better appearance
        borderRadius: "5px", // Optional: Slightly rounded corners
        cursor: "pointer", // Pointer cursor on hover
      }}
      onClick={submitAssociation}
    >
      Associate
    </button>

    </div>
  );
};

export default Association;
