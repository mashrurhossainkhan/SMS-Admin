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

const Add_Order = () => {
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
                    <CLabel htmlFor="text-input">Customer Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Customer Name"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Customer Address</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Customer Address"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Order Processed By</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Order Processed By"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Product Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="number-input"
                      name="number-input"
                      placeholder="Product Name"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Qty</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="number" placeholder="Qty" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Indian Rate</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="number" placeholder="Indian Rate" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Conversion Rate</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="number" placeholder="Conversion Rate" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">BDT</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="number" placeholder="BDT" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Amount</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="number" placeholder="Amount" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Status</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="number" placeholder="Status" />
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

export default Add_Order;
