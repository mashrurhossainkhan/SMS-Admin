import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../../actions/userActions'
import { useHistory } from 'react-router-dom'

const ForgetPassword = (props) => {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch();

  const userForgerPassword = useSelector((state) => state.userVerificationCode);
  const { loading, error, userVerificationCode} = userForgerPassword;

  const history = useHistory();
  useEffect(()=>{
    // It will run everytime  
    if(!loading && !error && userVerificationCode != null){
      history.push({
        pathname: '/emailverificationcode',
        state: { VerCode: userVerificationCode.VerificationCode }
      })
      
    }
  })
 
  const submit = (e) => {
    e.preventDefault();
    localStorage.setItem('8p3NpbHwepY43dHJ', {"email": email})
    dispatch(forgetPassword(email));
  }
  // History Function End
  return (
    <div className='c-app c-default-layout flex-row align-items-center'> 
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md='8'>
            <CCardGroup>
              <CCard className='p-4'>
                <CCardBody>
                  <CForm >
                    <h1>Forget Password</h1>
                    {loading ? <p>Please wait...</p> : ""}
                    <CInputGroup className='mb-3'>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name='cil-user' />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type='email'
                        placeholder='Enter your email'
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs='6'>
                        <CButton type='submit' color='primary' className='px-4' onClick={submit}>
                          Get Verification Code
                        </CButton>
                      </CCol>
                      
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className='text-white bg-primary py-5 d-md-down-none'
                style={{ width: '44%' }}
              >
               
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgetPassword;
