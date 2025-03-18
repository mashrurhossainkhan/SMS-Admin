import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilHome,
  cilClipboard,
  cilCalendar,
  cilSchool,
  cilUser,
  cilCheckCircle,
  cilChartLine,
  cilCreditCard,
} from '@coreui/icons';
import { API } from '../../actions/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(API + '/api/dashboard');
        setDashboardData(response.data.data);
      } catch (err) {
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate Balance: Credit - Debit
  const balanceAmount =
    (dashboardData?.totalCreditAmount || 0) -
    (dashboardData?.totalDebitAmount || 0);

  // **Navigation Sections:**
  const sections = [
    { name: 'Dashboard', icon: cilHome, route: '/dashboard' },
    {
      name: 'Notice Board',
      icon: cilClipboard,
      children: [
        { name: 'Create', route: '/notice_board/create' },
        { name: 'Manage', route: '/notice_board/manage/all' },
      ],
    },
    {
      name: 'Routine',
      icon: cilCalendar,
      children: [
        { name: 'Subject Create', route: '/subject/create' },
        { name: 'Routine Create', route: '/routine/create' },
      ],
    },
    { name: 'Students', icon: cilSchool, route: '/student/create' },
    { name: 'Teachers', icon: cilUser, route: '/teacher/create' },
    {
      name: 'Attendance',
      icon: cilCheckCircle,
      children: [
        { name: 'Add Attendance', route: '/attendance' },
        { name: 'Attendance History', route: '/attendance/history/dates' },
      ],
    },
    {
      name: 'Results',
      icon: cilChartLine,
      children: [
        { name: 'Result Type', route: '/add/result/type' },
        { name: 'Result', route: '/result/all/class' },
      ],
    },
    {
      name: 'Payments',
      icon: cilCreditCard,
      children: [
        { name: 'Credit', route: '/payments/credit' },
        { name: 'Debit', route: '/payment/debit' },
      ],
    },
  ];

  return (
    <CRow>
      <CCol xs="12">
        {/* 🚀 Banner Section */}
        <div className="dashboard-banner">
          <img
            src="/header.jpeg"
            alt="Dashboard Banner"
            className="banner-image"
            style={{ height: '300px' }}
          />
          <div className="banner-overlay">
            <h1>Welcome to Your Dashboard</h1>
          </div>
        </div>

        {/* 📊 Dashboard Summary */}
        <CCard className="mt-4">
          <CCardHeader>Dashboard Summary</CCardHeader>
          <CCardBody>
            {loading ? (
              <CSpinner color="primary" />
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <>
                <CRow>
                  <CCol md="4">
                    <CCard className="p-3 shadow-sm">
                      <h5>Total Users</h5>
                      <h3>{dashboardData?.totalUsers || 0}</h3>
                    </CCard>
                  </CCol>

                  <CCol md="4">
                    <CCard className="p-3 shadow-sm">
                      <h5>Total Students</h5>
                      <h3>{dashboardData?.totalStudents || 0}</h3>
                    </CCard>
                  </CCol>

                  <CCol md="4">
                    <CCard className="p-3 shadow-sm">
                      <h5>Total Teachers</h5>
                      <h3>{dashboardData?.totalTeachers || 0}</h3>
                    </CCard>
                  </CCol>

                  <CCol md="4">
                    <CCard className="p-3 shadow-sm">
                      <h5>Total Debit Amount</h5>
                      <h3>
                        {dashboardData?.totalDebitAmount?.toLocaleString() || 0}{' '}
                        BDT
                      </h3>
                    </CCard>
                  </CCol>

                  <CCol md="4">
                    <CCard className="p-3 shadow-sm">
                      <h5>Total Credit Amount</h5>
                      <h3>
                        {dashboardData?.totalCreditAmount?.toLocaleString() ||
                          0}{' '}
                        BDT
                      </h3>
                    </CCard>
                  </CCol>

                  <CCol md="4">
                    <CCard
                      className="p-3 shadow-sm"
                      color={balanceAmount >= 0 ? 'success' : 'danger'}
                      textColor="white"
                    >
                      <h5>Balance (Credit - Debit)</h5>
                      <h3>{balanceAmount.toLocaleString()} BDT</h3>
                    </CCard>
                  </CCol>
                </CRow>

                {/* 🚀 Navigation Buttons & Dropdowns */}
                <CRow className="mt-4">
                  {sections.map((section, index) => (
                    <CCol md="3" key={index} className="mb-3">
                      {section.children ? (
                        <CDropdown>
                          <CDropdownToggle color="primary" className="w-100">
                            <CIcon content={section.icon} size="lg" />{' '}
                            {section.name}
                          </CDropdownToggle>
                          <CDropdownMenu className="w-100">
                            {section.children.map((child, idx) => (
                              <CDropdownItem
                                key={idx}
                                onClick={() => history.push(child.route)}
                              >
                                {child.name}
                              </CDropdownItem>
                            ))}
                          </CDropdownMenu>
                        </CDropdown>
                      ) : (
                        <CButton
                          color="primary"
                          className="w-100 d-flex align-items-center justify-content-center gap-2"
                          onClick={() => history.push(section.route)}
                        >
                          <CIcon content={section.icon} size="lg" />
                          {section.name}
                        </CButton>
                      )}
                    </CCol>
                  ))}
                </CRow>
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Dashboard;
