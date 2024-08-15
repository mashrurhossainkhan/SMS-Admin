import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../../actions/userActions'
import CIcon from '@coreui/icons-react'

const Register = ({ history, location }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfoFamous } = userRegister
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfoFamous) {
      history.push(redirect)
    }
  }, [history, userInfoFamous, redirect])
  const submit = async (e) => {
    e.preventDefault()
    if (password !== password2) {
      alert('Password Do Not Match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <div className='c-app c-default-layout flex-row align-items-center'>
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md='9' lg='7' xl='6'>
            <CCard className='mx-4'>
              <CCardBody className='p-4'>
                <CForm onSubmit={submit}>
                  <h1>Register</h1>
                  <p className='text-muted'>Create your account</p>
                  <CInputGroup className='mb-3'>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name='cil-user' />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type='text'
                      placeholder='Username'
                      autoComplete='username'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className='mb-3'>
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type='text'
                      placeholder='Email'
                      autoComplete='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className='mb-3'>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name='cil-lock-locked' />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type='password'
                      placeholder='Password'
                      autoComplete='new-password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className='mb-4'>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name='cil-lock-locked' />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type='password'
                      placeholder='Repeat password'
                      autoComplete='new-password'
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </CInputGroup>
                  <CButton type='submit' color='success' block>
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className='p-4'>
                <CRow>
                  <CCol xs='12' sm='6'>
                    <CButton className='btn-facebook mb-1' block>
                      <span>facebook</span>
                    </CButton>
                  </CCol>
                  <CCol xs='12' sm='6'>
                    <CButton className='btn-twitter mb-1' block>
                      <span>twitter</span>
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
