import React, { useState } from 'react'
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
import { useHistory } from 'react-router-dom';

const EnterVerificationCode = (props) => {
  const [verification, setVerification] = useState('');

  const history = useHistory();
  const submit = (e) => {
    e.preventDefault();
    if(props.location.state.VerCode == verification){
        history.push({
            pathname: '/newpassword'
          })
    }else{
        alert("Please give a valid code");
    }
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
                    <h1>Enter verification code</h1>
                    <CInputGroup className='mb-3'>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name='cil-user' />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type='number'
                        placeholder='Enter your verification code'
                        onChange={(e) => {
                            setVerification(e.target.value)
                        }}
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs='6'>
                        <CButton type='submit' color='primary' className='px-4' onClick={submit}>
                            Change my password
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

export default EnterVerificationCode;
