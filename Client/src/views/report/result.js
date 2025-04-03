import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../actions/api';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ResultMatrixTable from './ResultMatrixTable';
import './Results.css';

const Results = () => {
  const { classNumber, section } = useParams(); // Get class & section from URL
  const [students, setStudents] = useState([]);
  const [resultTypes, setResultTypes] = useState([]); // Dynamic columns
  const [loading, setLoading] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedSubject, setSelectedSubjct] = useState();
  // Fetch teacherId from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK');
    try {
      const parsed = JSON.parse(stored);
      const token = parsed?.token;

      if (token) {
        const base64Payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Payload));

        if (decodedPayload?.userId) {
          setTeacherId(decodedPayload.userId);
        }

        if (decodedPayload?.userType !== undefined) {
          setUserType(decodedPayload.userType);
        }
      }
    } catch (err) {
      console.error('Error decoding token:', err);
    }
  }, []);

  // Fetch student details based on class & section
  useEffect(() => {
    setLoading(true);
    //get all subjects
    axios.get(`${API}/api/subjects/all/info`).then((response) => {
      setAllSubjects(response.data);
    });
    // Fetch student list
    axios
      .get(`${API}/api/result/student/list/${classNumber}/${section}`)
      .then((response) => {
        const updatedStudents = response.data.map((student) => ({
          ...student,
          scores: {},
          total: 0,
        }));
        setStudents(updatedStudents);
      })
      .catch((error) => {
        console.error('Error fetching student details:', error);
        setStudents([]);
      });

    // Fetch result types for table headers
    axios
      .get(`${API}/api/get/all/result/types`)
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setResultTypes(response.data.data);
          console.log(response.data.data);
        }
      })
      .catch((error) => console.error('Error fetching result types:', error));
    setLoading(false);

    if (allSubjects.length > 0 && !selectedSubject) {
      setSelectedSubjct(allSubjects[0].id);
    }
  }, [classNumber, section, allSubjects.length, selectedSubject]);

  // Fetch existing marks for each student and update input fields
  useEffect(() => {
    if (students.length > 0 && resultTypes.length > 0 && selectedSubject) {
      const fetchResults = async () => {
        const updatedStudents = [...students];

        for (let student of updatedStudents) {
          for (let type of resultTypes) {
            try {
              const response = await axios.get(
                `${API}/api/result/check/${student.userId}/${type.id}/${selectedSubject}`
              );

              if (response.data.exists) {
                student.scores[type.type] = response.data.marks; // Set existing marks
              } else {
                student.scores[type.type] = 0; // Default value if no result exists
              }
              const localKey = `results_${classNumber}_${section}_${selectedSubject}`;
const stored = localStorage.getItem(localKey);
if (stored) {
  const parsedLocal = JSON.parse(stored);
  setStudents(parsedLocal);
}

            } catch (error) {
              console.error(
                `Error fetching result for ${student.name} (${type.type}):`,
                error
              );
            }
          }
          student.total = Object.values(student.scores).reduce(
            (acc, val) => acc + val,
            0
          );
        }

        setStudents(updatedStudents);
        setLoading(false);
      };

      fetchResults();
    }
  }, [students.length, resultTypes.length, selectedSubject]);


  const handleSaveAll = async () => {
    try {
      for (let student of students) {
        for (let type of resultTypes) {
          const marks = student.scores[type.type] || 0;
  
          // Check if result exists
          const existingResult = await axios.get(
            `${API}/api/result/check/${student.userId}/${type.id}/${selectedSubject}`
          );
  
          const payload = {
            resultType: type.id,
            stId: student.userId,
            teacherId: teacherId,
            selectedSubject,
            marks,
            remarks: marks >= 75 ? 'Good' : '',
          };
  
          const updatePayload = {
            resultType: type.id,
            stId: student.userId,
            teacherId: teacherId,
            selectedSubject,
            marks,
            remarks: marks >= 75 ? 'Good' : '',
          };
  
          if (existingResult.data.exists) {
            await axios.put(
              `${API}/api/update/result/${existingResult.data.resultId}`,
              updatePayload
            );
          } else {
            await axios.post(`${API}/api/add/result`, payload);
          }
        }
      }
  
      alert('✅ All results saved successfully!');
      // Optionally clear localStorage
      const localKey = `results_${classNumber}_${section}_${selectedSubject}`;
      localStorage.removeItem(localKey);
    } catch (error) {
      console.error('❌ Error saving all results:', error);
      alert('Failed to save results. Please try again.');
    }
  };
  

  // Handle input change & auto-save result
  const handleInputChange = (studentIndex, type, value) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].scores[type.type] = parseFloat(value) || 0;
    updatedStudents[studentIndex].total = Object.values(
      updatedStudents[studentIndex].scores
    ).reduce((acc, val) => acc + val, 0);
  
    setStudents(updatedStudents);
  
    // ✅ Store in localStorage
    const localKey = `results_${classNumber}_${section}_${selectedSubject}`;
    localStorage.setItem(localKey, JSON.stringify(updatedStudents));
  };
  

  const generatePDF = async (studentId, classNumber, section) => {
    try {
      // Fetch student results from API
      const response = await axios.get(
        `${API}/api/get/result/student/${studentId.userId}`
      );
      const results = response.data.data;

      if (!results.length) {
        alert('No results found for this student.');
        return;
      }

      const doc = new jsPDF('p', 'mm', 'a4');

      // **Set Title & School Name**
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text(
        'Shahid Titumir Academy Manikganj',
        105,
        15,
        null,
        null,
        'center'
      );

      doc.setFontSize(14);
      doc.text('Student Result', 105, 25, null, null, 'center');

      // Get student name & roll number
      const studentName = results[0].studentDetails.name;
      const rollNo = studentId.rollNo;

      doc.setFontSize(11);
      doc.text(`Class: ${classNumber} - Section: ${section}`, 14, 35);
      doc.text(`Student: ${studentName} (Roll No: ${rollNo})`, 14, 42);

      // **Process Data for Table**
      const subjects = [...new Set(results.map((res) => res.subjectId))]; // Unique subject IDs
      const resultTypes = [
        ...new Set(results.map((res) => res.resultTypeDetails.type)),
      ]; // Unique result types

      const studentResults = {};

      // **Correctly Map Subject Names**
      const subjectNames = {};
      subjects.forEach((subjectId) => {
        const subjectData = allSubjects.find((sub) => sub.id === subjectId);
        subjectNames[subjectId] = subjectData
          ? subjectData.name
          : `Subject ${subjectId}`;
      });

      subjects.forEach((subjectId) => {
        studentResults[subjectId] = {
          subjectName: subjectNames[subjectId], // Now correctly mapped!
          scores: {},
          total: 0,
        };
      });

      // Populate student results
      results.forEach((res) => {
        studentResults[res.subjectId].scores[res.resultTypeDetails.type] =
          res.marks;
        studentResults[res.subjectId].total += res.marks;
      });

      // **Prepare Table Headers**
      const tableColumnHeaders = [
        'Subjects',
        ...resultTypes,
        'Total',
        'Remarks',
      ];

      // **Prepare Table Data**
      const tableRows = Object.keys(studentResults).map((subjectId) => [
        studentResults[subjectId].subjectName, // ✅ Fixed: Using correctly mapped subject names
        ...resultTypes.map(
          (rt) => studentResults[subjectId].scores[rt] || 'N/A'
        ),
        studentResults[subjectId].total, // Total marks
        '', // Empty Remarks Column
      ]);

      // **AutoTable Configuration**
      doc.autoTable({
        startY: 50,
        head: [tableColumnHeaders],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] }, // Blue header
        styles: { font: 'helvetica', fontSize: 10 },
        alternateRowStyles: { fillColor: [240, 240, 240] }, // Light grey rows
        margin: { top: 30 },
      });

      // **Add Signature Section**
      const pageHeight = doc.internal.pageSize.height;
      doc.setFont('helvetica', 'normal');

      doc.text('__________________________', 25, pageHeight - 40);
      doc.text("Teacher's Signature", 35, pageHeight - 30);

      doc.text('__________________________', 130, pageHeight - 40);
      doc.text("Guardian's Signature", 140, pageHeight - 30);

      // **Save PDF**
      doc.save(
        `Result_${studentName}_Class_${classNumber}_Section_${section}.pdf`
      );
    } catch (error) {
      console.error('Error fetching student results:', error);
      alert('Failed to generate PDF.');
    }
  };

  return (
    <>
      {userType === 2 ? (
        <ResultMatrixTable />
      ) : (
        <div className="results-container">
          <h1 className="results-title">
            Results for Class {classNumber} - Section {section}
          </h1>

          {loading ? (
            <p className="text-center text-gray-600">Loading students...</p>
          ) : students.length === 0 ? (
            <p className="text-center text-red-500">No students found.</p>
          ) : (
            <>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-center mb-4">
                  Subjects
                </h1>

                {allSubjects.length > 0 ? (
                  <div className="subjects-grid">
                    {allSubjects.map((subject) => (
                      <button
                        key={subject.id}
                        className={`subject-button ${
                          selectedSubject === subject.id ? 'selected' : ''
                        }`}
                        onClick={() => setSelectedSubjct(subject.id)}
                      >
                        {subject.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    No subjects available.
                  </p>
                )}

                {/* Display Selected Subject */}
                {selectedSubject && (
                  <p className="selected-subject">
                    Selected Subject:{' '}
                    {
                      allSubjects.find((sub) => sub.id === selectedSubject)
                        ?.name
                    }
                  </p>
                )}
              </div>
              {selectedSubject && (
            <div className="table-scroll-wrapper mt-6 w-full max-w-6xl mx-auto overflow-x-auto">
  <table className="results-table">
                    <thead>
                      <tr
                        style={{ color: 'black' }}
                        className="bg-blue-500 text-lg"
                      >
                        <th className="border p-3">Roll No</th>
                        <th className="border p-3">Name</th>
                        {resultTypes.map((type, index) => (
                          <th key={index} className="border p-3">
                            {type.type}
                          </th>
                        ))}
                        <th className="border p-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr
                          key={index}
                          className="text-center text-lg bg-gray-50 hover:bg-gray-200"
                        >
                          <td className="border p-3">{student.rollNo}</td>
                          <td className="border p-3">{student.name}</td>
                          {resultTypes.map((type, idx) => (
                            <td key={idx} className="border p-3">
                              <input
                                type="number"
                                className="w-full p-1 text-center border rounded"
                                value={student.scores[type.type] || ''}
                                onChange={(e) =>
                                  handleInputChange(index, type, e.target.value)
                                }
                              />
                            </td>
                          ))}
                          <td className="border p-3 font-bold">
                            {student.total}
                          </td>
                          <td className="border p-3 font-bold">
                            <button
                              className="print-button"
                              onClick={() =>
                                generatePDF(student, classNumber, section)
                              }
                            >
                              Print
                            </button>

                            <div className="text-center mt-4">
  <button
    className="save-all-button"
    onClick={handleSaveAll}
    style={{
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
  >
    💾 Save All to Database
  </button>
</div>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Results;
