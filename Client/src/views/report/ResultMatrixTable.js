import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ResultMatrixTable.css';
import { API } from '../../actions/api';
import { exportResultPDF } from './ResultPDFExport';

const ResultMatrixTable = () => {
  const [subjects, setSubjects] = useState([]);
  const [resultTypes, setResultTypes] = useState([]);
  const [results, setResults] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    userId: null,
    name: '',
    rollNo: '',
    class: '',
    section: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK');
    try {
      const parsed = JSON.parse(stored);
      const token = parsed?.token;

      if (token) {
        const base64Payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Payload));

        if (decodedPayload?.userId) {
          setStudentInfo({
            userId: decodedPayload.userId,
            name: decodedPayload.name,
            rollNo: decodedPayload.rollNo,
            class: decodedPayload.class,
            section: decodedPayload.section,
          });
        }
      }
    } catch (err) {
      console.error('Error decoding token:', err);
    }
  }, []);

  useEffect(() => {
    if (!studentInfo.userId) return;

    const fetchData = async () => {
      try {
        const [subjectRes, resultTypeRes, resultRes] = await Promise.all([
          axios.get(`${API}/api/subjects/all/info`),
          axios.get(`${API}/api/get/all/result/types`),
          axios.get(`${API}/api/get/result/student/${studentInfo.userId}`),
        ]);

        setSubjects(subjectRes.data);
        setResultTypes(resultTypeRes.data.data);
        setResults(resultRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [studentInfo.userId]);

  const getMark = (resultTypeId, subjectId) => {
    const match = results.find(
      (r) => r.resultType === resultTypeId && r.subjectId === subjectId
    );
    return match ? match.marks : '-';
  };

  return (
    <div className="matrix-container">
      <button
        onClick={() =>
          exportResultPDF({
            studentInfo,
            subjects,
            resultTypes,
            results,
          })
        }
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        📄 Export as PDF
      </button>
      <h2>Result</h2>

      {/* ✅ Student Info */}
      <div className="student-info">
        <p>
          <strong>Name:</strong> {studentInfo.name}
        </p>
        <p>
          <strong>Roll No:</strong> {studentInfo.rollNo}
        </p>
        <p>
          <strong>Class:</strong> {studentInfo.class}
        </p>
        <p>
          <strong>Section:</strong> {studentInfo.section}
        </p>
      </div>

      <table className="matrix-table">
        <thead>
          <tr>
            <th>Result Type</th>
            {subjects.map((subject) => (
              <th key={subject.id}>{subject.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resultTypes.map((type) => (
            <tr key={type.id}>
              <td>{type.type}</td>
              {subjects.map((subject) => (
                <td key={subject.id}>{getMark(type.id, subject.id)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultMatrixTable;
