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
  CSelect,
} from "@coreui/react";

export default function Category() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      {/* Modal Start */}
      <Button className="mb-3" variant="primary" onClick={handleShow}>
        Add New Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill Category Details</Modal.Title>
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
                        <CLabel htmlFor="text-input">Brand</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                      <CSelect custom size="lg" name="selectLg" id="selectLg">
                      <option value="0">Please select Brand</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </CSelect>
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Category Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Enter Category Name"
                    />
                  </CCol>
                </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Conversion Rate</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          type="number" class="form-control" 
                          id="conv_rate" name="conv_rate" 
                          min="0.01" max="100" step="0.01" 
                          autocomplete="off"
                          placeholder="1"
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Status</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                      <CSelect custom size="lg" name="selectLg" id="selectLg">
                      <option value="0">Active</option>
                      <option value="1">Inactive</option>
                    </CSelect>
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

