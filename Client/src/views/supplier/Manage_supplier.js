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

export default function Manage_supplier() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      {/* Modal Start */}
      <Button className="mb-3" variant="primary" onClick={handleShow}>
        Add New Supplier
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill supplier Details</Modal.Title>
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
                        <CLabel htmlFor="text-input">Supplier Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="text-input"
                          name="text-input"
                          placeholder="Supplier Name"
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Supplier Address</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="text-input"
                          name="text-input"
                          placeholder="Supplier Address"
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Supplier Phone</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                        type="number"
                          id="text-input"
                          name="text-input"
                          placeholder="Supplier Phone"
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
