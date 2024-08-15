import React, { useEffect, useState } from "react";
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
  CInput,
  CLabel,
  CRow,
  // CSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, addEmployeeMeta } from "src/actions/userActions";
import MessageBox from "src/reusable/MessageBox";
import LoadingBox from "src/reusable/LoadingBox";

const Add_user = (props) => {
  const [name, setName] = useState();
  const [employeeID, setEmployeeID] = useState();
  const [email, setEmail] = useState();
  const [mobileNum, setmobileNum] = useState();
  const [designation, setDesignaiton] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.newEmployee);
  const { loading, error, newEmployeeInfo } = userDetails;

  const userMetaDetails = useSelector((state) => state.newEmplyeeMeta);
  const {
    loading: loadingMeta,
    error: errorMeta,
    newEmployeeMetaInfo,
  } = userDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    var userInfo = JSON.parse(
      localStorage.getItem("3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK")
    );
    if (userInfo) {
      dispatch(
        addEmployee(
          name,
          employeeID,
          userInfo.company_id,
          email,
          mobileNum,
          designation,
          password
        )
      );
      //addEmployeeMeta(data.id, employeeID,designation);
      setName("");
      setEmployeeID("");
      setEmail("");
      setmobileNum("");
      setDesignaiton("");
      setPassword("");
    } else {
      props.history.push("/dashboard");
    }
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Add employee Information</CCardHeader>
            <CCardBody>
              <CForm
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Employee Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Employee Name"
                      required
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Employee ID</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      value={employeeID}
                      onChange={(e) => setEmployeeID(e.target.value)}
                      placeholder="Enter Employee ID"
                      required
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Email Address</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email Address"
                      required
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
                      value={mobileNum}
                      onChange={(e) => setmobileNum(e.target.value)}
                      placeholder="Mobile No"
                      required
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Employee Designation</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      value={designation}
                      onChange={(e) => setDesignaiton(e.target.value)}
                      placeholder="Enter Employee Designation"
                      required
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                    <CFormText className="help-block">
                      Share this password with the employee only
                    </CFormText>
                  </CCol>
                </CFormGroup>
              </CForm>
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox>Already exists or someting went wrong</MessageBox>
              ) : newEmployeeInfo ? (
                <MessageBox>User updated</MessageBox>
              ) : (
                ""
              )}
            </CCardBody>
            <CCardFooter>
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={handleSubmit}
              >
                <CIcon name="cil-scrubber" /> Add Employee
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Add_user;
