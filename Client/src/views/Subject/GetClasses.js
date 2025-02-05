import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButton,
  CSpinner,
} from "@coreui/react";
import { API } from "../../actions/api";

const GetClasses = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Subjects from Backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(API+"/api/subjects/get");
        const result = await response.json();

        if (response.ok) {
          setSubjects(result.data);
        } else {
          console.error("Error fetching subjects:", result.message);
        }
      } catch (error) {
        console.error("Server error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  // Function to Delete Subject
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;

    try {
      const response = await fetch(API+`/api/subjects/delete/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        alert("Subject deleted successfully!");
        setSubjects(subjects.filter((subject) => subject.id !== id)); // Remove from state
      } else {
        alert(result.message || "Failed to delete subject.");
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
      alert("Server error! Try again.");
    }
  };

  const fields = [
    { key: "name", label: "Subject Name" },
    { key: "class", label: "Class" },
    { key: "section", label: "Section" },
    { key: "shift", label: "Shift" },
    { key: "actions", label: "Actions" }, // New column for delete button
  ];

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>All Subjects</CCardHeader>
          <CCardBody>
            {loading ? (
              <CSpinner color="primary" />
            ) : (
              <CDataTable
                items={subjects}
                fields={fields}
                striped
                hover
                bordered
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  actions: (item) => (
                    <td>
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
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
    </CRow>
  );
};

export default GetClasses;
