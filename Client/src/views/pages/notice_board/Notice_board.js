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
import { TheSidebar, TheFooter, TheHeader } from '../../../containers/index';
import FormNoticeBoard from './Form_Notice_board';

const Notice_board = ({ history, location }) => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <FormNoticeBoard />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};
export default Notice_board;
