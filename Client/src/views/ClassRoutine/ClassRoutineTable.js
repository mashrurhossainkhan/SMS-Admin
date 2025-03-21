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
import './RoutineTable.css';

const dayColors = {
  MONDAY: '#FFEEAD',
  TUESDAY: '#D0F4DE',
  WEDNESDAY: '#FFCAD4',
  THURSDAY: '#B5EAEA',
  FRIDAY: '#E4C1F9',
  SATURDAY: '#FAF3DD',
  SUNDAY: '#FFC6FF',
};

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
        const decoded = jwtDecode(token);
        setUserType(decoded.userType);
      } catch (err) {
        console.error('Token decode error', err);
      }
    }
    fetchSubjects();
    fetchTeachers();
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    setLoading(true);
    const params = new URLSearchParams(filters).toString();
    try {
      const res = await fetch(`${API}/api/all/routine?${params}`);
      const data = await res.json();
      if (res.ok) setRoutines(data.data || []);
    } catch (err) {
      console.error('Routine fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    const res = await fetch(API + '/api/subjects/all/info');
    const data = await res.json();
    setSubjects(data || []);
  };

  const fetchTeachers = async () => {
    const res = await fetch(API + '/api/teacher/all');
    const data = await res.json();
    setTeachers(data.data || []);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirm delete?')) return;
    const res = await fetch(`${API}/api/delete/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Deleted');
      setRoutines(routines.filter((r) => r.id !== id));
    }
  };

  const openModal = (routine = null) => {
    setCurrentRoutine(
      routine || {
        day: 'MONDAY',
        startTime: '',
        endTime: '',
        subjectId: subjects[0]?.id || '',
        teacherId: '',
        class: '',
        section: '',
        roomNumber: '',
      }
    );
    setModal(true);
  };

  const handleSubmit = async () => {
    const endpoint = currentRoutine.id
      ? `/api/get/${currentRoutine.id}`
      : '/api/create/routine';
    const method = currentRoutine.id ? 'PUT' : 'POST';

    const res = await fetch(API + endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentRoutine),
    });

    if (res.ok) {
      alert(currentRoutine.id ? 'Updated!' : 'Created!');
      fetchRoutines();
      setModal(false);
    } else {
      alert('Failed to save routine due to clash or server error.');
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
    <CRow className="justify-content-center mt-4">
      <CCol md="11">
        <CCard className="shadow-lg">
          <CCardBody>
            <h3 className="mb-4 text-info">📘 Class Routine</h3>

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
                  {Object.keys(dayColors).map((day) => (
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
                  <option value="">All Classes</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((cls) => (
                    <option key={cls}>{cls}</option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="1">
                <CButton color="info" onClick={fetchRoutines}>
                  🔍
                </CButton>
              </CCol>
            </CRow>

            {userType !== 2 && (
              <CButton
                color="success"
                className="mb-3"
                onClick={() => openModal(null)}
              >
                ➕ Add Routine
              </CButton>
            )}

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
                  day: (item) => (
                    <td
                      style={{
                        backgroundColor: dayColors[item.day],
                        fontWeight: 'bold',
                      }}
                    >
                      {item.day}
                    </td>
                  ),
                  ...(userType !== 2 && {
                    actions: (item) => (
                      <td>
                        <CButton
                          size="sm"
                          color="info"
                          onClick={() => openModal(item)}
                        >
                          ✏️ Edit
                        </CButton>{' '}
                        <CButton
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          🗑️ Delete
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
                key: 'day',
                type: 'select',
                options: Object.keys(dayColors),
              },
              { label: 'Class', key: 'class', type: 'text' },
              { label: 'Section', key: 'section', type: 'text' },
              { label: 'Room Number', key: 'roomNumber', type: 'text' },
              { label: 'Start Time', key: 'startTime', type: 'time' },
              { label: 'End Time', key: 'endTime', type: 'time' },
            ].map(({ label, key, type, options }) => (
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
                        [key]:
                          key === 'section'
                            ? e.target.value.toUpperCase()
                            : e.target.value,
                      })
                    }
                  />
                )}
              </CFormGroup>
            ))}

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
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </CSelect>
            </CFormGroup>

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
                <option>-- Select Teacher --</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.email})
                  </option>
                ))}
              </CSelect>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSubmit}>
            💾 Save
          </CButton>
          <CButton color="secondary" onClick={() => setModal(false)}>
            ❌ Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default ClassRoutineTable;
