import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CDataTable,
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
} from "@coreui/react";
import { API } from "../../../actions/api";

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metaModal, setMetaModal] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState({ id: "", name: "", email: "" });
  const [teacherMeta, setTeacherMeta] = useState({
    highestQualification: "",
    experienceYears: "",
    subjectsTaught: "",
    contactNumber: "",
    emergencyContact: "",
    address: "",
    dateOfJoining: "", // Will use calendar picker
    salary: "",
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Fetch All Teachers
  const fetchTeachers = async () => {
    try {
      const response = await fetch(API + "/api/teacher/all");
      const result = await response.json();

      if (response.ok) {
        setTeachers(result.data);
      } else {
        console.error("Error fetching teachers:", result.message);
      }
    } catch (error) {
      console.error("Server error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete Teacher
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;

    try {
      const response = await fetch(API + `/api/teacher/${id}`, { method: "DELETE" });
      const result = await response.json();

      if (response.ok) {
        alert("Teacher deleted successfully!");
        setTeachers(teachers.filter((teacher) => teacher.id !== id));
      } else {
        alert(result.message || "Failed to delete teacher.");
      }
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert("Server error! Try again.");
    }
  };

  // Open Add More Data Modal
  const openMetaModal = async (teacher) => {
    setCurrentTeacher(teacher);

    try {
      // Check if teacher meta already exists
      const response = await fetch(API + `/api/get/${teacher.id}`);
      const result = await response.json();

      if (response.ok && result.data) {
        // If data exists, set it in the state
        setTeacherMeta(result.data);
      } else {
        // If no existing data, create a new entry
        const createResponse = await fetch(API + `/api/create/meta`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: teacher.id,
            highestQualification: "",
            experienceYears: "",
            subjectsTaught: "",
            contactNumber: "",
            emergencyContact: "",
            address: "",
            dateOfJoining: "",
            salary: "",
          }),
        });

        const createResult = await createResponse.json();

        if (createResponse.ok) {
          setTeacherMeta({
            userid: teacher.id,
            highestQualification: "",
            experienceYears: "",
            subjectsTaught: "",
            contactNumber: "",
            emergencyContact: "",
            address: "",
            dateOfJoining: "",
            salary: "",
          });
        } else {
          alert(createResult.message || "Failed to create teacher meta.");
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching or creating teacher meta:", error);
      alert("Server error! Try again.");
    }

    setMetaModal(true);
  };

  // Handle Insert/Update Teacher Meta
  const handleMetaSubmit = async () => {
    try {
      let response = await fetch(API + `/api/update/${currentTeacher.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherMeta),
      });

      let result = await response.json();
      alert("Teacher meta data saved!");
      setMetaModal(false);
    } catch (error) {
      console.error("Error updating/creating teacher meta:", error);
      alert("Server error! Try again.");
    }
  };

  const fields = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "createdAt", label: "Created At" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <CRow className="justify-content-center mt-5">
      <CCol md="10">
        <CCard className="shadow-lg rounded-lg border border-gray-200">
          <CCardBody className="p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Registered Teachers</h2>

            {loading ? (
              <CSpinner color="primary" />
            ) : (
              <CDataTable
                items={teachers}
                fields={fields}
                striped
                hover
                bordered
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  actions: (item) => (
                    <td>
                      <CButton color="danger" size="sm" onClick={() => handleDelete(item.id)}>
                        Delete
                      </CButton>{" "}
                      <CButton color="primary" size="sm" onClick={() => openMetaModal(item)}>
                        Add More Data
                      </CButton>
                    </td>
                  ),
                }}
              />
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Add More Data Modal */}
      <CModal show={metaModal} onClose={() => setMetaModal(false)} size="lg">
        <CModalHeader closeButton>Add More Teacher Data</CModalHeader>
        <CModalBody>
          <CForm>
            {Object.keys(teacherMeta)
              .filter((key) => !["id", "userid", "createdAt", "updatedAt", "deletedAt"].includes(key)) // Exclude fields
              .map((key) => (
                <CFormGroup key={key}>
                  <CLabel>{key.replace(/([A-Z])/g, " $1").trim()}</CLabel>
                  <CInput
                    type={key === "dateOfJoining" ? "date" : "text"} // Date picker for dateOfJoining
                    value={teacherMeta[key]}
                    onChange={(e) => setTeacherMeta({ ...teacherMeta, [key]: e.target.value })}
                  />
                </CFormGroup>
              ))}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleMetaSubmit}>
            Save
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setMetaModal(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default TeacherTable;
