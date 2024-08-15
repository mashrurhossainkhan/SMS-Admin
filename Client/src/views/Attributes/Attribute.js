import React from "react";
import { useState } from "react";
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
import AttributeTable from "../base/tables/AttributeTable";

export default function Attribute() {
  const page_name = "Attribute";
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      {/* Modal Start */}
      <Button className="mb-3" variant="primary" onClick={handleShow}>
        {`Add New ${page_name}`}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {`Fill ${page_name} Details`}</Modal.Title>
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
                        <CLabel htmlFor="text-input">{`${page_name} Name`}</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="text-input"
                          name="text-input"
                          placeholder={`${page_name} Name`}
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="selectLg">Status</CLabel>
                      </CCol>
                      <CCol xs="12" md="9" size="lg">
                        <CSelect custom size="lg" name="selectLg" id="selectLg">
                          <option value="0">Status</option>
                          <option value="1">Active</option>
                          <option value="2">Inactive</option>
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
      <AttributeTable />
    </div>
  );
}
