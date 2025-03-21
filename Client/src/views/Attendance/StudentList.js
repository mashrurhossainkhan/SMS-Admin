import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../actions/api';
import { TheSidebar } from '../../containers';
import './StudentList.css';

const StudentList = () => {
  const { classNumber, section } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({});
  const teacherData = localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK');

  const parsedData = JSON.parse(teacherData); // Convert JSON string to object
  const teacherId = parsedData.userId; // Get userId
  console.log(teacherId); // Check the extracted userId

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    axios
      .get(`${API}/api/attendace/${classNumber}/${section}`)
      .then((response) => {
        setStudents(response.data);
        setLoading(false);

        // Initialize attendance state
        const initialAttendance = {};
        response.data.forEach((student) => {
          initialAttendance[student.rollNo] = false; // Default: Absent
        });

        // Fetch existing attendance records
        axios
          .get(`${API}/api/get-attendance/${classNumber}/${section}`)
          .then((res) => {
            res.data.forEach((record) => {
              initialAttendance[record.rollNo] = record.presentOrAbsent === 1;
            });
            setAttendance(initialAttendance);
          })
          .catch((err) =>
            console.error('Error fetching attendance records:', err)
          );
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setLoading(false);
      });
  }, [classNumber, section]);

  const handleCheckboxChange = (rollNo) => {
    setAttendance((prev) => ({
      ...prev,
      [rollNo]: !prev[rollNo],
    }));
  };

  const submitAttendance = () => {
    console.log(attendance);
    const attendanceData = students.map((student) => ({
      studentId: student.userId,
      present: attendance[student.userId],
    }));

    axios
      .post(`${API}/mark-or-update-attendance`, {
        teacherId,
        classNumber,
        section,
        attendanceData,
      })
      .then((response) => {
        alert('Attendance submitted successfully!');
      })
      .catch((error) => {
        console.error('Error submitting attendance:', error);
        alert('Failed to submit attendance.');
      });
  };

  return (
    <>
      <TheSidebar />
      <div style={{ textAlign: 'center' }} className="attendance-container">
        <h2 className="attendance-subtitle">{today}</h2>
        <h1 className="attendance-title">
          Class {classNumber} - Section {section}
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading students...</p>
        ) : students.length === 0 ? (
          <p className="text-center text-red-500">No students found.</p>
        ) : (
          <div
            style={{ display: 'flex', justifyContent: ' center' }}
            className="w-2/3 mx-auto overflow-x-auto"
          >
            <table className="attendance-table">
              <thead>
                <tr className="bg-blue-500 text-white text-lg">
                  <th style={{ color: 'black' }} className="border p-4">
                    Roll No
                  </th>
                  <th style={{ color: 'black' }} className="border p-4">
                    Name
                  </th>
                  <th style={{ color: 'black' }} className="border p-4">
                    Present
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className="text-center text-lg bg-gray-50 hover:bg-gray-200"
                  >
                    <td className="border p-4">{student.rollNo}</td>
                    <td className="border p-4">{student.name}</td>
                    <td className="border p-4">
                      <input
                        type="checkbox"
                        className="w-6 h-6 cursor-pointer"
                        checked={attendance[student.userId]}
                        onChange={() => handleCheckboxChange(student.userId)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Submit Button */}
        {!loading && students.length > 0 && (
          <button
            onClick={submitAttendance}
            className="attendance-submit-btn"
            style={{ color: 'black', marginTop: '30px' }}
          >
            Submit Attendance
          </button>
        )}
      </div>
    </>
  );
};

export default StudentList;
