import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CSpinner,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CDataTable,
} from "@coreui/react";
import { API } from "../../actions/api";

const ClassRoutineTable = () => {
  const [filters, setFilters] = useState({
    teacherId: "",
    class: "",
    day: "",
    subjectId: "",
  });
  const [routines, setRoutines] = useState([]);
  const [subjects, setSubjects] = useState([]); // Store subjects
  const [teachers, setTeacher] = useState([]); // Store subjects
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(""); 
  const [modal, setModal] = useState(false);
  const [currentRoutine, setCurrentRoutine] = useState({
    day: "MONDAY",
    startTime: "",
    endTime: "",
    subjectId: "",
    teacherId: "",
    class: "",
    section: "",
    roomNumber: "",
  });

  useEffect(() => {
    fetchRoutines();
    fetchSubjects();
    fetchTeachers();
  }, []);

  const fetchRoutines = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams(filters).toString();
    try {
      const response = await fetch(`${API}/api/all/routine?${queryParams}`);
      const result = await response.json();
      if (response.ok) {
        setRoutines(result.data || []);
      } else {
        console.error("Error fetching routines:", result.message);
      }
    } catch (error) {
      console.error("Server error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Subjects for Dropdown
  const fetchSubjects = async () => {
    try {
      const response = await fetch(API + "/api/subjects/all/info");
      const result = await response.json();

      if (response.ok) {
        setSubjects(result || []);
      } else {
        console.error("Error fetching subjects:", result.message);
        setSubjects([]);
      }
    } catch (error) {
      console.error("Server error:", error);
      setSubjects([]);
    }
  };


    // Fetch Subjects for Dropdown
    const fetchTeachers = async () => {
        try {
          const response = await fetch(API + "/api/teacher/all");
          const result = await response.json();
          if (response.ok) {
            setTeacher(result.data || []);
          } else {
            console.error("Error fetching subjects:", result.message);
            setTeacher([]);
          }
        } catch (error) {
          console.error("Server error:", error);
          setTeacher([]);
        }
      };

  // Handle Delete Class Routine
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this class routine?")) return;

    try {
      const response = await fetch(API + `/api/delete/${id}`, { method: "DELETE" });
      const result = await response.json();

      if (response.ok) {
        alert("Class routine deleted successfully!");
        setRoutines(routines.filter((routine) => routine.id !== id));
      } else {
        alert(result.message || "Failed to delete class routine.");
      }
    } catch (error) {
      console.error("Error deleting class routine:", error);
      alert("Server error! Try again.");
    }
  };
  const handleTeacherChange = (e) => {
    const teacherId = e.target.value;
    setSelectedTeacher(teacherId);
    fetchRoutines(teacherId); // Fetch filtered routines
  };
  // Open Add/Edit Modal
  const openModal = (routine = null) => {
    if (routine) {
      setCurrentRoutine(routine);
    } else {
      setCurrentRoutine({
        day: "MONDAY",
        startTime: "",
        endTime: "",
        subjectId: subjects.length > 0 ? subjects[0].id : "",
        teacherId: "",
        class: "",
        section: "",
        roomNumber: "",
      });
    }
    setModal(true);
  };

  // Handle Insert/Update Class Routine
  const handleSubmit = async () => {
    const apiEndpoint = currentRoutine.id
      ? `/api/get/${currentRoutine.id}`
      : "/api/create/routine";
    const method = currentRoutine.id ? "PUT" : "POST";

    try {
      const response = await fetch(API + apiEndpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentRoutine),
      });

      const result = await response.json();

      if (response.ok) {
        alert(currentRoutine.id ? "Routine updated successfully!" : "Routine added successfully!");
        fetchRoutines();
        setModal(false);
      } else {
        alert(result.message || "Failed to save class routine.");
      }
    } catch (error) {
      console.error("Error saving class routine:", error);
      alert("Server error! Try again.");
    }
  };

  const fields = [
    { key: "day", label: "Day" },
    { key: "subjectName", label: "subject Name" },
    { key: "teacherName", label: "Teacher Name" },
    { key: "class", label: "Class" },
    { key: "section", label: "Section" },
    { key: "roomNumber", label: "Room" },
    { key: "startTime", label: "Start Time" },
    { key: "endTime", label: "End Time" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <CRow className="justify-content-center mt-5">
      <CCol md="10">
        <CCard className="shadow-lg rounded-lg border border-gray-200">
          <CCardBody className="p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Class Routine</h2>

            <div style={{display: "flex"}}>
            <CButton color="primary" onClick={() => openModal(null)} className="mb-3">
              Add New Routine
            </CButton>
            </div>


            <div>
              
                {/* ✅ Teacher Dropdown for Filtering */}
                <CRow className="mb-3">
              <CCol md="3">
                <CSelect value={filters.teacherId} onChange={(e) => setFilters({ ...filters, teacherId: e.target.value })}>
                  <option value="">All Teachers</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="3">
                <CSelect value={filters.subjectId} onChange={(e) => setFilters({ ...filters, subjectId: e.target.value })}>
                  <option value="">All Subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="3">
                <CSelect value={filters.day} onChange={(e) => setFilters({ ...filters, day: e.target.value })}>
                  <option value="">All Days</option>
                  {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="3">
                <CSelect value={filters.class} onChange={(e) => setFilters({ ...filters, class: e.target.value })}>
                  <option value="">All Class</option>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map((clas) => (
                    <option key={clas} value={clas}>
                      {clas}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="3">
                <CButton color="primary" onClick={fetchRoutines}>
                  Apply Filters
                </CButton>
              </CCol>
            </CRow>
            </div>
            {loading ? (
              <CSpinner color="primary" />
            ) : (
              <CDataTable
                items={routines}
                fields={fields}
                striped
                hover
                bordered
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  actions: (item) => (
                    <td>
                      <CButton color="info" size="sm" onClick={() => openModal(item)}>
                        Edit
                      </CButton>{" "}
                      <CButton color="danger" size="sm" onClick={() => handleDelete(item.id)}>
                        Delete
                      </CButton>
                    </td>
                  ),
                }}
              />
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Add/Edit Modal */}
      <CModal show={modal} onClose={() => setModal(false)} size="lg">
        <CModalHeader closeButton>{currentRoutine.id ? "Edit" : "Add"} Class Routine</CModalHeader>
        <CModalBody>
          <CForm>
            <CFormGroup>
              <CLabel>Day</CLabel>
              <CSelect
                value={currentRoutine.day}
                onChange={(e) => setCurrentRoutine({ ...currentRoutine, day: e.target.value })}
              >
                {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map(
                  (day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  )
                )}
              </CSelect>
            </CFormGroup>

            <CFormGroup>
              <CLabel>Class</CLabel>
              <CInput
                type="text"
                value={currentRoutine.class}
                onChange={(e) => setCurrentRoutine({ ...currentRoutine, class: e.target.value })}
              />
            </CFormGroup>


            <CFormGroup>
              <CLabel>Section</CLabel>
              <CInput
                type="text"
                value={currentRoutine.section.toUpperCase()}
                onChange={(e) => setCurrentRoutine({ ...currentRoutine, section: e.target.value.toUpperCase() })}
              />
            </CFormGroup>

            <CFormGroup>
              <CLabel>Subject</CLabel>
              <CSelect
                value={currentRoutine.subjectId}
                onChange={(e) => setCurrentRoutine({ ...currentRoutine, subjectId: e.target.value })}
              >
                {subjects.length > 0 ? (
                  subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No subjects available</option>
                )}
              </CSelect>
            </CFormGroup>

            <CFormGroup>
              <CLabel>Room Number</CLabel>
              <CInput
                type="text"
                value={currentRoutine.roomNumber}
                onChange={(e) => setCurrentRoutine({ ...currentRoutine, roomNumber: e.target.value })}
              />
            </CFormGroup>


            <CFormGroup>
              <CLabel>Start Time</CLabel>
              <CInput
                type="time"
                value={currentRoutine.startTime}
                onChange={(e) => setCurrentRoutine({ ...currentRoutine, startTime: e.target.value })}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel>End Time</CLabel>
              <CInput
                type="time"
                value={currentRoutine.endTime}
                onChange={(e) => setCurrentRoutine({ ...currentRoutine, endTime: e.target.value })}
              />
            </CFormGroup>

            <CFormGroup>
              <CLabel>Teacher</CLabel>
              <CSelect
                value={currentRoutine.teacherId}
                onChange={(e) => setCurrentRoutine({ ...currentRoutine, teacherId: e.target.value })}
              >
                <option >
                     Assign Teacher
                    </option>
                {teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} - {teacher.email}
                    </option>
                  ))
                ) : (
                  <option disabled>No Teacher registered</option>
                )}
              </CSelect>
            </CFormGroup>

          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSubmit}>
            Save
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setModal(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default ClassRoutineTable;
