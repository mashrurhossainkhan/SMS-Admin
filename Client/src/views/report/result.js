import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../actions/api";
import { useParams } from "react-router-dom";

const Results = () => {
  const { classNumber, section } = useParams(); // Get class & section from URL
  const [students, setStudents] = useState([]);
  const [resultTypes, setResultTypes] = useState([]); // Dynamic columns
  const [loading, setLoading] = useState(true);
  const [teacherId, setTeacherId] = useState(null);

  // Fetch teacherId from localStorage
  useEffect(() => {
    const teacherData = JSON.parse(localStorage.getItem("3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK")); // Adjust key if needed
    if (teacherData?.userId) {
      setTeacherId(teacherData.userId);
    }
  }, []);

  // Fetch student details based on class & section
  useEffect(() => {
    setLoading(true);

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
        console.error("Error fetching student details:", error);
        setStudents([]);
      });

    // Fetch result types for table headers
    axios
      .get(`${API}/api/get/all/result/types`)
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setResultTypes(response.data.data);
          console.log(response.data.data)
        }
      })
      .catch((error) => console.error("Error fetching result types:", error));
    setLoading(false);
  }, [classNumber, section]);


  // Fetch existing marks for each student and update input fields
  useEffect(() => {
    if (students.length > 0 && resultTypes.length > 0) {
      const fetchResults = async () => {
        const updatedStudents = [...students];

        for (let student of updatedStudents) {
          for (let type of resultTypes) {
            try {
              const response = await axios.get(`${API}/api/result/check/${student.userId}/${type.id}`);
              
              if (response.data.exists) {
                student.scores[type.type] = response.data.marks; // Set existing marks
              } else {
                student.scores[type.type] = 0; // Default value if no result exists
              }
            } catch (error) {
              console.error(`Error fetching result for ${student.name} (${type.type}):`, error);
            }
          }
          student.total = Object.values(student.scores).reduce((acc, val) => acc + val, 0);
        }
        
        setStudents(updatedStudents);
        setLoading(false);
      };

      fetchResults();
    }
  }, [students.length, resultTypes.length]);

  // Handle input change & auto-save result
  const handleInputChange = async (studentIndex, type, value) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].scores[type.type] = parseFloat(value) || 0;
    // Recalculate total
    updatedStudents[studentIndex].total = Object.values(updatedStudents[studentIndex].scores)
      .reduce((acc, val) => acc + val, 0);

    setStudents(updatedStudents);

    // **Auto-save the result**
    try {
      const student = updatedStudents[studentIndex];
      const existingResult = await axios.get(`${API}/api/result/check/${student.userId}/${type.id}`);
      const resultData = {
        resultType: type.type,
        stId: student.userId,
        teacherId: teacherId,
        //associationId: 1, // Placeholder, adjust if needed
        marks: student.scores[type.type] || 0,
        remarks: student.scores[type.type] >= 75 ? "Good" : "",
      };


      const resultDataUpdate = {
        resultType: type.id,
        stId: student.userId,
        teacherId: teacherId,
        //associationId: 1, // Placeholder, adjust if needed
        marks: student.scores[type.type] || 0,
        remarks: student.scores[type.type] >= 75 ? "Good" : "",
      };
      //console.log(existingResult.data.exists)

      if (existingResult.data.exists) {
        // If result exists, update it
        await axios.put(`${API}/api/update/result/${existingResult.data.resultId}`, resultDataUpdate);
      } else {
        // If result doesn't exist, create it
        await axios.post(`${API}/api/add/result`, resultData);
      }
    } catch (error) {
      console.error("Error auto-saving result:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center">
        Results for Class {classNumber} - Section {section}
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-center text-red-500">No students found.</p>
      ) : (
        <div style={{overflowX: "scroll"}} className="mt-6 w-full max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg">
            <thead>
              <tr style={{color: "black"}} className="bg-blue-500 text-lg">
                <th className="border p-3">Roll No</th>
                <th className="border p-3">Name</th>
                {resultTypes.map((type, index) => (
                  <th key={index} className="border p-3">{type.type}</th>
                ))}
                <th className="border p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="text-center text-lg bg-gray-50 hover:bg-gray-200">
                  <td className="border p-3">{student.rollNo}</td>
                  <td className="border p-3">{student.name}</td>
                  {resultTypes.map((type, idx) => (
                    <td key={idx} className="border p-3">
                      <input
                        type="number"
                        className="w-full p-1 text-center border rounded"
                        value={student.scores[type.type] || ""}
                        onChange={(e) => handleInputChange(index, type, e.target.value)}
                      />
                    </td>
                  ))}
                  <td className="border p-3 font-bold">{student.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Results;
