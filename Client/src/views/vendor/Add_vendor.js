import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CTextarea,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const Add_vendor = () => {
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Please Fill This Form</CCardHeader>
            <CCardBody>
              <CForm
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">User Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="User Name"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Full Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Full Name"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Mobile No</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="number-input"
                      name="number-input"
                      placeholder="Mobile No"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Email Input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="email"
                      id="email-input"
                      name="email-input"
                      placeholder="Enter Email"
                      autoComplete="email"
                    />
                    <CFormText className="help-block">
                      Please enter your email
                    </CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">NID No</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="number-input"
                      name="number-input"
                      placeholder="NID No"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Bank Account / M Cash</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="number-input"
                      name="number-input"
                      placeholder="Bank Account / M Cash"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="password"
                      id="password-input"
                      name="password-input"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                    <CFormText className="help-block">
                      Please enter a complex password
                    </CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">Confirm Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="password"
                      id="password-input"
                      name="password-input"
                      placeholder="Confirm Password"
                    />
                    <CFormText className="help-block">
                      Please enter a password again
                    </CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Textarea</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      name="textarea-input"
                      id="textarea-input"
                      rows="9"
                      placeholder="Content..."
                    />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary">
                <CIcon name="cil-scrubber" /> Submit
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Add_vendor;
