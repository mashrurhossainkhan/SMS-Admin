import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { studentFetchForTeachers } from '../../actions/userActions';
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

  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    if (email) {
      dispatch(studentFetchForTeachers(email));
    }
  }, [dispatch, email]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = () => {
    console.log('Attendance submitted:', attendance);
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
                  <li key={student.id}>
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
                          name={`present-${student.studentEmail}`}
                          checked={
                            attendance[student.studentEmail] === 'present'
                          }
                          onChange={() =>
                            handleAttendanceChange(
                              student.studentEmail,
                              'present'
                            )
                          }
                        />
                        Present
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name={`absent-${student.studentEmail}`}
                          checked={
                            attendance[student.studentEmail] === 'absent'
                          }
                          onChange={() =>
                            handleAttendanceChange(
                              student.studentEmail,
                              'absent'
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
