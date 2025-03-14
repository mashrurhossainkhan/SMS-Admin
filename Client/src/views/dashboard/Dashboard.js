import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
} from '@coreui/react';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard summary on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard');
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
        <CCard>
          <CCardHeader>Dashboard Summary</CCardHeader>
          <CCardBody>
            {loading ? (
              <CSpinner color="primary" />
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
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
                      {dashboardData?.totalCreditAmount?.toLocaleString() || 0}{' '}
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
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Dashboard;
