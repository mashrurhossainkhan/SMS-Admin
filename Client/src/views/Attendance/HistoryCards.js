import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../actions/api';
import { TheSidebar } from '../../containers';
import './HistoryCards.css';

const HistoryCards = () => {
  const [dates, setDates] = useState([]);
  const [classSections, setClassSections] = useState({});
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingClassSections, setLoadingClassSections] = useState({});
  const [loadingStudents, setLoadingStudents] = useState({});
  const [openDate, setOpenDate] = useState(null);
  const [openClassSection, setOpenClassSection] = useState(null);

  // Fetch attendance history dates
  useEffect(() => {
    axios
      .get(`${API}/api/get/all/history/date`)
      .then((response) => {
        setDates(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching attendance history dates:', error);
        setLoading(false);
      });
  }, []);

  // Fetch class-section details for a date
  const fetchClassSections = (date) => {
    if (openDate === date) {
      setOpenDate(null);
      return;
    }

    setOpenDate(date);
    setLoadingClassSections((prev) => ({ ...prev, [date]: true }));

    axios
      .get(`${API}/api/get/class-sections/${date}`)
      .then((response) => {
        setClassSections((prev) => ({ ...prev, [date]: response.data }));
        setLoadingClassSections((prev) => ({ ...prev, [date]: false }));
      })
      .catch((error) => {
        console.error('Error fetching class sections:', error);
        setLoadingClassSections((prev) => ({ ...prev, [date]: false }));
      });
  };

  // Fetch students for a class-section
  const fetchStudents = (date, classNumber, section) => {
    const key = `${date}-${classNumber}-${section}`;
    if (openClassSection === key) {
      setOpenClassSection(null);
      return;
    }

    setOpenClassSection(key);
    setLoadingStudents((prev) => ({ ...prev, [key]: true }));

    axios
      .get(`${API}/api/get/class-sections/${date}`)
      .then((response) => {
        const selectedClassSection = response.data.find(
          (entry) => entry.class === classNumber && entry.section === section
        );
        setStudentData((prev) => ({
          ...prev,
          [key]: selectedClassSection?.students || [],
        }));
        setLoadingStudents((prev) => ({ ...prev, [key]: false }));
      })
      .catch((error) => {
        console.error('Error fetching student details:', error);
        setLoadingStudents((prev) => ({ ...prev, [key]: false }));
      });
  };

  return (
    <>
      <TheSidebar />
      <div className="p-5 history-container">
        <h1 className="history-title">Attendance History</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : dates.length === 0 ? (
          <p className="text-center text-red-500">
            No attendance history found.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dates.map((date, index) => (
              <div key={index} className="w-full">
                <div
                  className="history-date-card"
                  onClick={() => fetchClassSections(date)}
                >
                  {date}
                </div>

                {openDate === date && (
                  <div className="history-section">
                    {loadingClassSections[date] ? (
                      <p className="text-center text-gray-500">
                        Loading class sections...
                      </p>
                    ) : classSections[date]?.length ? (
                      classSections[date].map(
                        ({ class: classNumber, section }) => {
                          const key = `${date}-${classNumber}-${section}`;
                          return (
                            <div key={key} className="mt-2">
                              <div
                                className="history-class-section"
                                onClick={() =>
                                  fetchStudents(date, classNumber, section)
                                }
                              >
                                Class {classNumber} - Section {section}
                              </div>

                              {openClassSection === key && (
                                <div className="mt-2">
                                  {loadingStudents[key] ? (
                                    <p className="text-center text-gray-500">
                                      Loading students...
                                    </p>
                                  ) : studentData[key]?.length ? (
                                    <div
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                      className="overflow-x-auto"
                                    >
                                      <table className="history-table">
                                        <thead>
                                          <tr
                                            style={{ color: 'black' }}
                                            className="bg-blue-500 text-black text-lg"
                                          >
                                            <th className="border p-4">
                                              Roll No
                                            </th>
                                            <th className="border p-4">Name</th>
                                            <th className="border p-4">
                                              Present
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {studentData[key].map(
                                            (student, idx) => (
                                              <tr
                                                key={idx}
                                                className="text-center text-lg bg-gray-50 hover:bg-gray-200"
                                              >
                                                <td className="border p-4">
                                                  {student.rollNo}
                                                </td>
                                                <td className="border p-4">
                                                  {student.studentName}
                                                </td>
                                                <td className="border p-4">
                                                  {student.presentOrAbsent
                                                    ? '✅'
                                                    : '❌'}
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  ) : (
                                    <p className="text-center text-red-500">
                                      No students found.
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        }
                      )
                    ) : (
                      <p className="text-center text-gray-500">
                        No class sections available.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HistoryCards;
