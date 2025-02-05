import React, { useState } from "react";
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
  CSelect,
} from "@coreui/react";
import { API } from "../../actions/api";
import GetClasses from "./GetClasses";

const SubjectCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    shift: "Morning", // Default shift
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    //e.preventDefault();

    try {
      const response = await fetch(API+"/api/subjects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Subject created successfully!");
        //setFormData({ name: "", class: "", section: "", shift: "Morning" }); // Reset form
      } else {
        alert(result.message || "Failed to create subject.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error! Try again.");
    }
  };

  return (
    <>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Create New Subject</CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* Subject Name */}
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
                  />
                </CCol>
              </CFormGroup>

              {/* Class */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="class">Class</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="class"
                    name="class"
                    placeholder="Enter class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CFormGroup>

              {/* Section */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="section">Section</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="section"
                    name="section"
                    placeholder="Enter section"
                    value={formData.section}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CFormGroup>

              {/* Shift Dropdown */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="shift">Shift</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect
                    id="shift"
                    name="shift"
                    value={formData.shift}
                    onChange={handleChange}
                    required
                  >
                    <option value="Morning">Morning</option>
                    <option value="Day">Day</option>
                  </CSelect>
                </CCol>
              </CFormGroup>

              <CCardFooter>
                <CButton type="submit" size="sm" color="primary">
                  Submit
                </CButton>
              </CCardFooter>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <GetClasses/>
    </>
  );
};

export default SubjectCreate;
