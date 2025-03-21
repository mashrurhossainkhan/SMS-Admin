import React, { useEffect, useState } from 'react';
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
} from '@coreui/react';
import { jwtDecode } from 'jwt-decode';
import { API } from '../../actions/api';

const ClassRoutineTable = () => {
  const [filters, setFilters] = useState({
    teacherId: '',
    class: '',
    day: '',
    subjectId: '',
  });
  const [routines, setRoutines] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [userType, setUserType] = useState(null);

  const [currentRoutine, setCurrentRoutine] = useState({
    day: 'MONDAY',
    startTime: '',
    endTime: '',
    subjectId: '',
    teacherId: '',
    class: '',
    section: '',
    roomNumber: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserType(decodedToken.userType);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
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
        console.error('Error fetching routines:', result.message);
      }
    } catch (error) {
      console.error('Server error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch(API + '/api/subjects/all/info');
      const result = await response.json();
      if (response.ok) {
        setSubjects(result || []);
      } else {
        console.error('Error fetching subjects:', result.message);
        setSubjects([]);
      }
    } catch (error) {
      console.error('Server error:', error);
      setSubjects([]);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch(API + '/api/teacher/all');
      const result = await response.json();
      if (response.ok) {
        setTeachers(result.data || []);
      } else {
        console.error('Error fetching teachers:', result.message);
        setTeachers([]);
      }
    } catch (error) {
      console.error('Server error:', error);
      setTeachers([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this class routine?'))
      return;

    try {
      const response = await fetch(API + `/api/delete/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (response.ok) {
        alert('Class routine deleted successfully!');
        setRoutines(routines.filter((routine) => routine.id !== id));
      } else {
        alert(result.message || 'Failed to delete class routine.');
      }
    } catch (error) {
      console.error('Error deleting class routine:', error);
      alert('Server error! Try again.');
    }
  };

  const openModal = (routine = null) => {
    if (routine) {
      setCurrentRoutine(routine);
    } else {
      setCurrentRoutine({
        day: 'MONDAY',
        startTime: '',
        endTime: '',
        subjectId: subjects.length > 0 ? subjects[0].id : '',
        teacherId: '',
        class: '',
        section: '',
        roomNumber: '',
      });
    }
    setModal(true);
  };

  const handleSubmit = async () => {
    const apiEndpoint = currentRoutine.id
      ? `/api/get/${currentRoutine.id}`
      : '/api/create/routine';
    const method = currentRoutine.id ? 'PUT' : 'POST';

    try {
      const response = await fetch(API + apiEndpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentRoutine),
      });

      const result = await response.json();

      if (response.ok) {
        alert(
          currentRoutine.id
            ? 'Routine updated successfully!'
            : 'Routine added successfully!'
        );
        fetchRoutines();
        setModal(false);
      } else {
        alert(result.message || 'Failed to save class routine.');
      }
    } catch (error) {
      console.error('Error saving class routine:', error);
      alert('Server error! Try again.');
    }
  };

  const fields = [
    { key: 'day', label: 'Day' },
    { key: 'subjectName', label: 'Subject' },
    { key: 'teacherName', label: 'Teacher' },
    { key: 'class', label: 'Class' },
    { key: 'section', label: 'Section' },
    { key: 'roomNumber', label: 'Room' },
    { key: 'startTime', label: 'Start Time' },
    { key: 'endTime', label: 'End Time' },
    ...(userType !== 2 ? [{ key: 'actions', label: 'Actions' }] : []),
  ];

  return (
    <CRow className="justify-content-center mt-5">
      <CCol md="10">
        <CCard className="shadow-lg rounded-lg border border-gray-200">
          <CCardBody className="p-4">
            <h2 className="text-xl font-semibold mb-4">Class Routine</h2>

            {userType !== 2 && (
              <CButton
                color="primary"
                className="mb-3"
                onClick={() => openModal(null)}
              >
                Add New Routine
              </CButton>
            )}

            {/* Filters */}
            <CRow className="mb-3">
              <CCol md="3">
                <CSelect
                  value={filters.teacherId}
                  onChange={(e) =>
                    setFilters({ ...filters, teacherId: e.target.value })
                  }
                >
                  <option value="">All Teachers</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="3">
                <CSelect
                  value={filters.subjectId}
                  onChange={(e) =>
                    setFilters({ ...filters, subjectId: e.target.value })
                  }
                >
                  <option value="">All Subjects</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="3">
                <CSelect
                  value={filters.day}
                  onChange={(e) =>
                    setFilters({ ...filters, day: e.target.value })
                  }
                >
                  <option value="">All Days</option>
                  {[
                    'MONDAY',
                    'TUESDAY',
                    'WEDNESDAY',
                    'THURSDAY',
                    'FRIDAY',
                    'SATURDAY',
                    'SUNDAY',
                  ].map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="2">
                <CSelect
                  value={filters.class}
                  onChange={(e) =>
                    setFilters({ ...filters, class: e.target.value })
                  }
                >
                  <option value="">All Class</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="1">
                <CButton color="primary" onClick={fetchRoutines}>
                  Filter
                </CButton>
              </CCol>
            </CRow>

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
                  ...(userType !== 2 && {
                    actions: (item) => (
                      <td>
                        <CButton
                          color="info"
                          size="sm"
                          onClick={() => openModal(item)}
                        >
                          Edit
                        </CButton>{' '}
                        <CButton
                          color="danger"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </CButton>
                      </td>
                    ),
                  }),
                }}
              />
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal */}
      <CModal show={modal} onClose={() => setModal(false)} size="lg">
        <CModalHeader closeButton>
          {currentRoutine.id ? 'Edit' : 'Add'} Class Routine
        </CModalHeader>
        <CModalBody>
          <CForm>
            {[
              {
                label: 'Day',
                type: 'select',
                key: 'day',
                options: [
                  'MONDAY',
                  'TUESDAY',
                  'WEDNESDAY',
                  'THURSDAY',
                  'FRIDAY',
                  'SATURDAY',
                  'SUNDAY',
                ],
              },
              { label: 'Class', type: 'text', key: 'class' },
              { label: 'Section', type: 'text', key: 'section' },
              { label: 'Room Number', type: 'text', key: 'roomNumber' },
              { label: 'Start Time', type: 'time', key: 'startTime' },
              { label: 'End Time', type: 'time', key: 'endTime' },
            ].map(({ label, type, key, options }) => (
              <CFormGroup key={key}>
                <CLabel>{label}</CLabel>
                {type === 'select' ? (
                  <CSelect
                    value={currentRoutine[key]}
                    onChange={(e) =>
                      setCurrentRoutine({
                        ...currentRoutine,
                        [key]: e.target.value,
                      })
                    }
                  >
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </CSelect>
                ) : (
                  <CInput
                    type={type}
                    value={currentRoutine[key]}
                    onChange={(e) =>
                      setCurrentRoutine({
                        ...currentRoutine,
                        [key]: e.target.value,
                      })
                    }
                  />
                )}
              </CFormGroup>
            ))}

            {/* Subject Dropdown */}
            <CFormGroup>
              <CLabel>Subject</CLabel>
              <CSelect
                value={currentRoutine.subjectId}
                onChange={(e) =>
                  setCurrentRoutine({
                    ...currentRoutine,
                    subjectId: e.target.value,
                  })
                }
              >
                <option>-- Select Subject --</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </CSelect>
            </CFormGroup>

            {/* Teacher Dropdown */}
            <CFormGroup>
              <CLabel>Teacher</CLabel>
              <CSelect
                value={currentRoutine.teacherId}
                onChange={(e) =>
                  setCurrentRoutine({
                    ...currentRoutine,
                    teacherId: e.target.value,
                  })
                }
              >
                <option>-- Assign Teacher --</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name} ({teacher.email})
                  </option>
                ))}
              </CSelect>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSubmit}>
            Save
          </CButton>
          <CButton color="secondary" onClick={() => setModal(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default ClassRoutineTable;
