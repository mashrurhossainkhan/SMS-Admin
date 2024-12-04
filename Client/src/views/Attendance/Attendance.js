import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  studentAttendanceBulkForTeachers,
  studentFetchForTeachers,
} from '../../actions/userActions';
import './Attendance.css'; // Import the CSS file

const Attendance = () => {
  const dispatch = useDispatch();

  const userInfo = localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK')
    ? JSON.parse(localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK'))
    : null;

  const email = userInfo?.email;

  const studentInfoForAttendance = useSelector(
    (state) => state.studentInfoForAttendance
  );
  const { loading, error, allStudentsInfo } = studentInfoForAttendance;

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    if (email) {
      dispatch(studentFetchForTeachers(email));
    }
  }, [dispatch, email]);

  const handleAttendanceChange = (
    studentId,
    status,
    teacherId,
    associationId
  ) => {
    setAttendance((prev) => {
      const updatedAttendance = prev.filter(
        (record) => record.studentId !== studentId
      );
      updatedAttendance.push({
        studentId,
        teacherId,
        associationId,
        presentOrAbsent: status === 'present' ? 1 : 0,
      });
      return updatedAttendance;
    });
  };

  const handleSubmit = () => {
    dispatch(studentAttendanceBulkForTeachers({ attendanceData: attendance }));
  };

  return (
    <div className="attendance-container">
      <h1>Attendance</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          {allStudentsInfo && allStudentsInfo.length > 0 ? (
            <form>
              <ul className="student-list">
                {allStudentsInfo.map((student) => (
                  <li key={student.studentId}>
                    <p>
                      <strong>Name:</strong> {student.studentName}
                    </p>
                    <p>
                      <strong>Email:</strong> {student.studentEmail}
                    </p>
                    <div className="attendance-options">
                      <label>
                        <input
                          type="checkbox"
                          name={`present-${student.studentId}`}
                          checked={attendance.find(
                            (record) =>
                              record.studentId === student.studentId &&
                              record.presentOrAbsent === 1
                          )}
                          onChange={() =>
                            handleAttendanceChange(
                              student.studentId,
                              'present',
                              student.teacherId,
                              student.associationId
                            )
                          }
                        />
                        Present
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name={`absent-${student.studentId}`}
                          checked={attendance.find(
                            (record) =>
                              record.studentId === student.studentId &&
                              record.presentOrAbsent === 0
                          )}
                          onChange={() =>
                            handleAttendanceChange(
                              student.studentId,
                              'absent',
                              student.teacherId,
                              student.associationId
                            )
                          }
                        />
                        Absent
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="submit-button"
                onClick={handleSubmit}
              >
                Submit Attendance
              </button>
            </form>
          ) : (
            <p>No students found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Attendance;
