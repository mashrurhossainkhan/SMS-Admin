import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CTextarea,
} from '@coreui/react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import CIcon from '@coreui/icons-react';
import { useDispatch } from 'react-redux';
import { addNotice } from '../../../actions/noticeActions';
import './NoticeForm.css';

const FormNoticeBoard = ({ history, location }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const previewUrl = URL.createObjectURL(e.target.files[0]);
    setImagePreview(previewUrl);
  };

  const submit = (e) => {
    e.preventDefault();

    // Dispatch the action
    dispatch(addNotice(date, title, description, file));
    setDate('');
    setTitle('');
    setDescription('');
    alert('Notice submited');
  };

  return (
    <div className="c-app c-default-layout flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol>
            <CCard>
              <CCardBody className="p-4">
                <CForm onSubmit={submit}>
                  {' '}
                  <h1>Create Notice here</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>Date</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="date"
                      placeholder="date"
                      autoComplete="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>Title</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="noticeTitle"
                      autoComplete="noticeTitle"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>Notice Details</CInputGroupText>
                    </CInputGroupPrepend>
                    <div style={{ flex: 1 }}>
                      <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        placeholder="Write your notice here..."
                        style={{
                          height: '200px',
                          borderRadius: '0 6px 6px 0',
                          backgroundColor: '#fff',
                        }}
                      />
                    </div>
                  </CInputGroup>
                  {/* <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        {imagePreview ? imagePreview : 'File'}
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="file"
                      id="noticeFile"
                      name="file"
                      onChange={(e) => handleFileChange(e)}
                    />
                  </CInputGroup> */}
                  <CButton
                    type="submit"
                    className="btnNoticeBoard"
                    style={{ color: '#ffffff', backgroundColor: '#000000' }}
                    block
                  >
                    Create Notice
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

export default FormNoticeBoard;
