import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from '@coreui/react';
import { API } from '../../actions/api';
import GetClasses from './GetClasses';

const SubjectCreate = () => {
  const [formData, setFormData] = useState({ name: '' });
  const [refreshSubjects, setRefreshSubjects] = useState(false); // trigger refresh

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.toUpperCase() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API + '/api/subjects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ Subject created successfully!');
        setFormData({ name: '' });
        setRefreshSubjects((prev) => !prev); // trigger re-fetch
      } else {
        alert(result.message || '❌ Failed to create subject.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Server error! Try again.');
    }
  };

  return (
    <>
      <CRow className="justify-content-center mt-4">
        <CCol md="8">
          <CCard className="shadow-lg border-0">
            <CCardHeader className="bg-gradient-primary text-white font-weight-bold">
              🎓 Create New Subject
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">Subject Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="name"
                      name="name"
                      placeholder="Enter subject name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="rounded shadow-sm"
                    />
                  </CCol>
                </CFormGroup>
                <CRow>
                  <CCol className="text-right pr-4">
                    <CButton
                      type="submit"
                      size="lg"
                      color="success"
                      className="px-4 font-weight-bold"
                    >
                      ➕ Submit
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <div className="mt-5">
        <GetClasses refresh={refreshSubjects} />
      </div>
    </>
  );
};

export default SubjectCreate;
