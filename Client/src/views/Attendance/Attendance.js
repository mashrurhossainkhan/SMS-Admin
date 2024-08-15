import React from "react";
// import { Dialog } from "@material-ui/core";
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
import ImportTable from "../base/tables/ImportTable";
import AttendanceTable from "../base/tables/AttendanceTable";

export default function Attendance() {
  const page_name = "Attendance";
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
          <Modal.Title>{`Fill ${page_name} Details`}</Modal.Title>
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
                        <CLabel htmlFor="text-input"> Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="text-input"
                          name="text-input"
                          placeholder="Name"
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Designation</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="text-input"
                          name="text-input"
                          placeholder="Designation"
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">In time</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="text-input"
                          name="text-input"
                          placeholder="In time"
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Out time</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="text-input"
                          name="text-input"
                          placeholder="Out time"
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
      <AttendanceTable />
    </div>
  );
}
