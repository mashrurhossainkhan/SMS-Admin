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
import _nav from '../../containers/_nav';
import { API } from '../../actions/api';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Extract userType from token
    const token = localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserType(decodedToken.userType); // Set userType
        console.log(decodedToken);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }

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

        {/* 📊 Dashboard Summary - Hidden if userType === 2 */}
        {userType !== 2 && (
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
                          {dashboardData?.totalDebitAmount?.toLocaleString() ||
                            0}{' '}
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
                </>
              )}
            </CCardBody>
          </CCard>
        )}
      </CCol>
    </CRow>
  );
};

export default Dashboard;
