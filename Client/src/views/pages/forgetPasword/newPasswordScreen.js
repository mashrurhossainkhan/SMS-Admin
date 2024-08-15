import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useDispatch } from 'react-redux';
import { newPassword } from '../../../actions/userActions';

const NewPasswordScreen = (props) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      alert('Password Doesnot match');
    } else {
      alert('Password match = ');
    }
  };
  // History Function End
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Enter New Password</h1>

                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Enter new password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />

                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="confirm password"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />

                    <CRow>
                      <CCol xs="6">
                        <CButton
                          type="submit"
                          color="primary"
                          className="px-4"
                          onClick={submit}
                        >
                          Change my password
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: '44%' }}
              ></CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default NewPasswordScreen;
