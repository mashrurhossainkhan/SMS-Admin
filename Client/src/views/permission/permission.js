import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CDataTable,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CSpinner,
  CFormGroup,
  CInputCheckbox,
} from '@coreui/react';

const PermissionTable = () => {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get(
          'http://localhost:5000/api/users/exclude-students'
        );
        const permissionsRes = await axios.get(
          'http://localhost:5000/permissions'
        );

        setUsers(usersRes.data.data);
        setPermissions(permissionsRes.data.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePermissionToggle = (userId, permissionId) => {
    setUserPermissions((prev) => {
      const updatedPermissions = new Set(prev[userId] || []);
      if (updatedPermissions.has(permissionId)) {
        updatedPermissions.delete(permissionId);
      } else {
        updatedPermissions.add(permissionId);
      }
      return { ...prev, [userId]: updatedPermissions };
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/user-permissions/bulk-update',
        {
          permissions: userPermissions,
        }
      );
      alert('Permissions updated successfully!');
    } catch (err) {
      alert('Failed to update permissions.');
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <h4>Manage User Permissions</h4>
      </CCardHeader>
      <CCardBody>
        {loading ? (
          <CSpinner color="primary" />
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <>
            <CDataTable
              items={users}
              fields={[
                { key: 'name', label: 'User' },
                ...permissions.map((perm) => ({
                  key: perm.id,
                  label: perm.type,
                })),
              ]}
              hover
              striped
              bordered
              itemsPerPage={10}
              pagination
              scopedSlots={{
                name: (item) => (
                  <td>
                    <strong>{item.name}</strong> <br />
                    <small>{item.email}</small>
                  </td>
                ),
                ...permissions.reduce((acc, perm) => {
                  acc[perm.id] = (item) => (
                    <td className="text-center">
                      <CFormGroup>
                        <CInputCheckbox
                          checked={
                            userPermissions[item.id]?.has(perm.id) || false
                          }
                          onChange={() =>
                            handlePermissionToggle(item.id, perm.id)
                          }
                        />
                      </CFormGroup>
                    </td>
                  );
                  return acc;
                }, {}),
              }}
            />
            <div className="text-center mt-3">
              <CButton color="primary" onClick={handleSaveChanges}>
                Save Changes
              </CButton>
            </div>
          </>
        )}
      </CCardBody>
    </CCard>
  );
};

export default PermissionTable;
