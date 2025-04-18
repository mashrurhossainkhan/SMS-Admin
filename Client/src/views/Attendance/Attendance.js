import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../actions/api';
import ResultMatrixTable from '../report/ResultMatrixTable';
import './ClassCards.css';

const ClassCards = () => {
  const currentPath = window.location.pathname;
  const [classes, setClasses] = useState([]);
  const [openClass, setOpenClass] = useState(null);
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState({});
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK');
    try {
      const parsed = JSON.parse(stored);
      const token = parsed?.token;

      if (token) {
        const base64Payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Payload));

        if (decodedPayload?.userType !== undefined) {
          setUserType(decodedPayload.userType);
        }
      }
    } catch (err) {
      console.error('Error decoding token:', err);
    }
    axios
      .get(`${API}/api/get/all/class/attendace`)
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching classes:', error);
      });
  }, []);

  const fetchSections = (classNumber) => {
    if (openClass === classNumber) {
      setOpenClass(null); // Close dropdown if already open
      return;
    }

    setOpenClass(classNumber);
    setLoading((prev) => ({ ...prev, [classNumber]: true }));

    axios
      .get(`${API}/api/get/all/section/by/class/${classNumber}`)
      .then((response) => {
        setSections((prev) => ({ ...prev, [classNumber]: response.data }));
        setLoading((prev) => ({ ...prev, [classNumber]: false }));
      })
      .catch((error) => {
        console.error('Error fetching sections:', error);
        setLoading((prev) => ({ ...prev, [classNumber]: false }));
      });
  };

  return (
    <>
      {userType === 2 ? (
        <ResultMatrixTable />
      ) : (
        <div className="grid grid-cols-3 gap-4 p-5">
          {classes.map((classNumber) => (
            <div
              key={classNumber}
              className="class-card p-4 text-center text-xl font-semibold"
              onClick={() => fetchSections(classNumber)}
            >
              <div className="flex flex-col items-center">
                <span>Class {classNumber}</span>
                {openClass === classNumber && (
                  <div className="mt-2 w-full bg-white border rounded-lg shadow-md p-2">
                    {loading[classNumber] ? (
                      <p className="text-gray-500 text-sm">
                        Loading sections...
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {sections[classNumber]?.map((section) => {
                          // Determine navigation path based on current location
                          const targetPath =
                            currentPath === '/attendance/history'
                              ? '/attendance/history/dates'
                              : currentPath === '/attendance'
                              ? `/attendance/students/${classNumber}/${section}`
                              : currentPath === '/result/all/class'
                              ? `/report/${classNumber}/${section}`
                              : `/attendance/students/${classNumber}/${section}`;

                          return (
                            <div
                              key={section}
                              className="section-button text-center cursor-pointer"
                              onClick={() =>
                                (window.location.href = targetPath)
                              } // Navigate on click
                            >
                              Section {section}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ClassCards;
