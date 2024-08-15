import React from "react";
// import { Dialog } from "@material-ui/core";
import { useState } from "react";
import DataTable from "../base/tables/CustomersTable";
import { Modal, Button } from "react-bootstrap";
import {
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CTextarea,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";

export default function Customer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      {/* Modal Start */}
      <Button className="mb-3" variant="primary" onClick={handleShow}>
        Add New Customer
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form Start */}
          <CRow>
            <CCol>
              <CCard>
                <CCardBody>
                  <CForm
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    className="form-horizontal"
                  >
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
                        <CLabel htmlFor="textarea-input">Address</CLabel>
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
              </CCard>
            </CCol>
          </CRow>
          {/* Form End */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal End */}
      <DataTable />
    </div>
  );
}
