import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  // CCollapse,
  // CDropdownItem,
  // CDropdownMenu,
  // CDropdownToggle,
  // CFade,
  CForm,
  CFormGroup,
  CFormText,
  // CValidFeedback,
  // CInvalidFeedback,
  CTextarea,
  CInput,
  // CInputFile,
  // CInputCheckbox,
  // CInputRadio,
  // CInputGroup,
  // CInputGroupAppend,
  // CInputGroupPrepend,
  // CDropdown,
  // CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  // CSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const Setting = () => {
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
                    <CLabel htmlFor="text-input">Company Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Company Name"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Email"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">First Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="First Name"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="number-input"
                      name="number-input"
                      placeholder="Last Name"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="selectLg">Gender</CLabel>
                  </CCol>
                  <CCol xs="12" md="9" size="lg">
                    <CSelect custom size="lg" name="selectLg" id="selectLg">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Mobile No.</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="number-input"
                      name="number-input"
                      placeholder="Mobile No."
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

export default Setting;
