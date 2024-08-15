import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../../reusable/LoadingBox';
import MessageBox from '../../../reusable/MessageBox';
/*
import {
  detailsUserByCompanyId,
  removeEmployee,
} from '../../../actions/userActions.js';
*/
export default function Manage_GroupOf_user_DataTable(props) {
  const employeeByCompanyID = useSelector((state) => state.employeeByCompanyID);
  const { loading, error, allEmployeeByCompanyID } = employeeByCompanyID;

  const signinInfo = useSelector((state) => state.userLogin);
  const { loading: loadingUser, error: errorUser, userInfoGS } = signinInfo;

  const dispatch = useDispatch();

  /*
  useEffect(() => {
    dispatch(detailsUserByCompanyId(userInfoGS.company_id));
  }, [dispatch, userInfoGS.company_id]);
*/
  const handleRemoveEmployee = (e, userID) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete ${userID}?`)) {
      //dispatch(removeEmployee(userID));
      window.location.reload();
    }
  };
  return (
    <div style={{ maxWidth: '100%' }}>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        allEmployeeByCompanyID && (
          <MaterialTable
            title="Manage User"
            columns={[
              { title: 'User Name', field: 'userName' },
              { title: 'Employee ID', field: 'employeeID' },
              { title: 'Email', field: 'email' },
              { title: 'Phone No', field: 'phoneNo' },
              { title: 'Designation', field: 'designation' },
            ]}
            data={
              loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox>Something went wrong!</MessageBox>
              ) : (
                allEmployeeByCompanyID
                  .filter((item) => item.visibility === 1)
                  .map((item) => ({
                    userID: item.id,
                    userName: item.userName,
                    employeeID: item.User_metum
                      ? item.User_metum.employee_id
                      : '',
                    email: item.email,
                    phoneNo: item.User_metum ? item.User_metum.phn_no : '',
                    designation: item.User_metum
                      ? item.User_metum.designation
                      : '',
                  }))
              )
            }
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit User',
                onClick: (event, data) => console.log(data.userID),
              },
              {
                icon: 'delete',
                tooltip: 'Delete User',
                onClick: (event, data) =>
                  handleRemoveEmployee(event, data.userID),
              },
            ]}
            options={{
              actionsColumnIndex: -1,
            }}
          />
        )
      )}
    </div>
  );
}
