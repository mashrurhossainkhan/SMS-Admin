import React, { useEffect, useState } from 'react';
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
} from '@coreui/react';
import { API } from '../../../actions/api';
import './StudentTable.css';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [metaModal, setMetaModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    id: '',
    name: '',
    email: '',
  });
  const [studentMeta, setStudentMeta] = useState({
    class: '',
    section: '',
    rollNo: '',
    phoneNumber: '',
    fatherName: '',
    fatherOccupation: '',
    fatherPhoneNumer: '',
    motherName: '',
    motherOccupation: '',
    motherPhoneNumber: '',
    localGuardianName: '',
    localGuardianOccupation: '',
    localGuardianPhoneNumber: '',
    relationWithLocalguardian: '',
    nationalIdCard: '',
    birthCertificate: '',
    presentAddress: '',
    permanentAddress: '',
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(API + '/api/student/all');
        const result = await response.json();

        if (response.ok) {
          setStudents(result.data);
        } else {
          console.error('Error fetching students:', result.message);
        }
      } catch (error) {
        console.error('Server error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle Delete Student
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?'))
      return;

    try {
      const response = await fetch(API + `/api/student/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (response.ok) {
        alert('Student deleted successfully!');
        setStudents(students.filter((student) => student.id !== id));
      } else {
        alert(result.message || 'Failed to delete student.');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Server error! Try again.');
    }
  };

  // Open Edit Modal
  const openEditModal = (student) => {
    setCurrentStudent(student);
    setModal(true);
  };

  // Open Add More Data Modal
  const openMetaModal = async (student) => {
    setCurrentStudent(student);

    try {
      // Check if student meta already exists
      const response = await fetch(API + `/api/student/meta/get/${student.id}`);
      const result = await response.json();

      if (response.ok && result.data) {
        // If data exists, set it in the state
        setStudentMeta(result.data);
      } else {
        // If no existing data, create a new entry
        const createResponse = await fetch(API + `/api/student/meta/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userid: student.id,
            class: '',
            section: '',
            rollNo: '',
            phoneNumber: '',
            fatherName: '',
            fatherOccupation: '',
            fatherPhoneNumer: '',
            motherName: '',
            motherOccupation: '',
            motherPhoneNumber: '',
            localGuardianName: '',
            localGuardianOccupation: '',
            localGuardianPhoneNumber: '',
            relationWithLocalguardian: '',
            nationalIdCard: '',
            birthCertificate: '',
            presentAddress: '',
            permanentAddress: '',
          }),
        });

        const createResult = await createResponse.json();

        if (createResponse.ok) {
          //alert("Student meta data created successfully!");
          setStudentMeta({
            userid: student.id, // Ensure userId is stored in the state
            class: '',
            section: '',
            rollNo: '',
            phoneNumber: '',
            fatherName: '',
            fatherOccupation: '',
            fatherPhoneNumer: '',
            motherName: '',
            motherOccupation: '',
            motherPhoneNumber: '',
            localGuardianName: '',
            localGuardianOccupation: '',
            localGuardianPhoneNumber: '',
            relationWithLocalguardian: '',
            nationalIdCard: '',
            birthCertificate: '',
            presentAddress: '',
            permanentAddress: '',
          });
        } else {
          alert(createResult.message || 'Failed to create student meta.');
          return;
        }
      }
    } catch (error) {
      console.error('Error fetching or creating student meta:', error);
      alert('Server error! Try again.');
    }

    setMetaModal(true);
  };

  // Handle Update Student
  const handleUpdate = async () => {
    try {
      const response = await fetch(API + `/api/student/${currentStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentStudent),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Student updated successfully!');
        setStudents(
          students.map((student) =>
            student.id === currentStudent.id ? currentStudent : student
          )
        );
        setModal(false);
      } else {
        alert(result.message || 'Failed to update student.');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Server error! Try again.');
    }
  };

  // Handle Insert/Update Student Meta
  const handleMetaSubmit = async () => {
    try {
      let response = await fetch(
        API + `/api/student/meta/${currentStudent.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentMeta),
        }
      );

      let result = await response.json();
      alert('data saved!');

      setMetaModal(false);
    } catch (error) {
      console.error('Error updating/creating student meta:', error);
      alert('Server error! Try again.');
    }
  };

  const fields = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <CRow className="justify-content-center mt-5">
      <CCol md="10">
        <CCard className="shadow-lg rounded-lg border border-gray-200">
          <CCardBody className="p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Registered Students
            </h2>

            {loading ? (
              <CSpinner color="primary" />
            ) : (
              <CDataTable
                items={students}
                fields={fields}
                striped
                hover
                bordered
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  actions: (item) => (
                    <td>
                      {/* <CButton color="info" size="sm" onClick={() => openEditModal(item)}>
                        Edit
                      </CButton>{" "} */}
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </CButton>{' '}
                      <CButton
                        color="primary"
                        size="sm"
                        onClick={() => openMetaModal(item)}
                      >
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
        <CModalHeader closeButton>Add More Student Data</CModalHeader>
        <CModalBody>
          <CForm>
            {Object.keys(studentMeta)
              .filter(
                (key) =>
                  !['id', 'createdAt', 'updatedAt', 'deletedAt'].includes(key)
              ) // Exclude fields
              .map((key) => (
                <CFormGroup key={key}>
                  <CLabel>{key.replace(/([A-Z])/g, ' $1').trim()}</CLabel>
                  <CInput
                    type="text"
                    value={studentMeta[key]}
                    onChange={(e) =>
                      setStudentMeta({
                        ...studentMeta,
                        [key]:
                          key === 'section'
                            ? e.target.value.toUpperCase()
                            : e.target.value,
                      })
                    }
                    disabled={key === 'userid'} // Disable the userid field
                  />
                </CFormGroup>
              ))}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleMetaSubmit}>
            Save
          </CButton>{' '}
          <CButton color="secondary" onClick={() => setMetaModal(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default StudentTable;
