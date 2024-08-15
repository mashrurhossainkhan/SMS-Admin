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

export default function Crm() {
  const page_name = "Import";
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
                        <CLabel htmlFor="text-input"> Supplier Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="text-input"
                          name="text-input"
                          placeholder="Enter Supplier Name"
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Indian Rate</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="text-input"
                          name="text-input"
                          placeholder="Indian Rate"
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Conversion Rate</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          type="number"
                          class="form-control"
                          id="conv_rate"
                          name="conv_rate"
                          min="0.01"
                          max="100"
                          step="0.01"
                          autocomplete="off"
                          placeholder="1"
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">BDT(auto)</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="text-input"
                          name="text-input"
                          placeholder="%"
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Other Cost</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="text-input"
                          name="text-input"
                          placeholder="Enter Price"
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Total Amount</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="text-input"
                          name="text-input"
                          placeholder="Total"
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
      <ImportTable />
    </div>
  );
}
