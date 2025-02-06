import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../actions/userActions';
import CIcon from '@coreui/icons-react';

const Register = ({ history, location, userTypeProps }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [userType, setUserType] = useState(1);
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfoFamous } = userRegister;
  const redirect = location?.search ? location.search.split('=')[1] : '/';
  useEffect(() => {
    if (userInfoFamous && !userTypeProps) {
      history.push(redirect);
    }

    if (userTypeProps) {
      setUserType(parseInt(userTypeProps));
    }

    console.log('redirect = ' + redirect);
  }, [history, userInfoFamous, redirect, userTypeProps]);
  const submit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('Password Do Not Match');
    } else {
      if (userTypeProps) {
        setUserType(parseInt(userTypeProps));
      }
      dispatch(register(name, email, password, userType));
      alert('Successfully Created!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="shadow-lg rounded-lg border border-gray-200">
              <CCardBody className="p-6">
                <CForm onSubmit={submit}>
                  <h1 className="text-xl font-semibold text-gray-700">Register</h1>
                  <p className="text-gray-500 mb-4">Create your account</p>
  
                  {/* Username Input */}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText className="bg-gray-200">
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      className="border rounded-md px-3 py-2 w-full"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </CInputGroup>
  
                  {/* Email Input */}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText className="bg-gray-200">@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      className="border rounded-md px-3 py-2 w-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
  
                  {/* Password Input */}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText className="bg-gray-200">
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      className="border rounded-md px-3 py-2 w-full"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
  
                  {/* Confirm Password Input */}
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText className="bg-gray-200">
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      className="border rounded-md px-3 py-2 w-full"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </CInputGroup>
  
                  <CButton type="submit" color="primary" block className="py-2 text-lg">
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );  
};

export default Register;
