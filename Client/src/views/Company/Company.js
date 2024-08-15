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

const Company = () => {
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
                    <CLabel htmlFor="text-input">Charge Amount (%)</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="100"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Vat Charge (%)</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="15"
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
                    <CLabel htmlFor="text-input">Country</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="number-input"
                      name="number-input"
                      placeholder="Country"
                    />
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

export default Company;
