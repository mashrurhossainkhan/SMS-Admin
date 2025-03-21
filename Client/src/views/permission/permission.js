import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CDataTable,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CSpinner,
  CSwitch,
} from '@coreui/react';
import { API } from '../../actions/api';

const Permission = () => {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [userPermissions, setUserPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get(`${API}/api/users/exclude-students`);
        const permissionsRes = await axios.get(`${API}/permissions`);
        const assignedPermsRes = await axios.get(`${API}/permissions/all`);

        setUsers(usersRes.data.data);
        setPermissions(permissionsRes.data.data);

        const permissionsMap = {};
        assignedPermsRes.data.data.forEach((entry) => {
          if (!permissionsMap[entry.userId]) {
            permissionsMap[entry.userId] = new Set();
          }
          permissionsMap[entry.userId].add(entry.permissionTypeId);
        });

        setUserPermissions(permissionsMap);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePermissionToggle = async (userId, permissionTypeId) => {
    const isAssigned = userPermissions[userId]?.has(permissionTypeId);

    try {
      if (isAssigned) {
        await axios.delete(
          `${API}/api/user-permissions/${userId}/${permissionTypeId}`
        );
      } else {
        await axios.post(`${API}/permissions/assign`, {
          userId,
          permissionTypeId,
        });
      }

      setUserPermissions((prev) => {
        const updatedPermissions = new Set(prev[userId] || []);
        if (isAssigned) {
          updatedPermissions.delete(permissionTypeId);
        } else {
          updatedPermissions.add(permissionTypeId);
        }
        return { ...prev, [userId]: updatedPermissions };
      });
    } catch (err) {
      alert('Failed to update permission');
    }
  };

  return (
    <CCard className="shadow-lg rounded">
      <CCardHeader className="bg-primary text-white">
        <h4 className="mb-0">👥 Manage User Permissions</h4>
      </CCardHeader>
      <CCardBody>
        {loading ? (
          <div className="text-center my-5">
            <CSpinner color="primary" size="lg" />
          </div>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <CDataTable
            items={users}
            fields={[
              { key: 'name', label: 'User' },
              ...permissions.map((perm) => ({
                key: perm.id,
                label: perm.type,
                _style: { width: '120px', textAlign: 'center' },
              })),
            ]}
            hover
            striped
            bordered
            responsive
            itemsPerPage={8}
            pagination
            scopedSlots={{
              name: (item) => (
                <td>
                  <strong>{item.name}</strong>
                  <br />
                  <small className="text-muted">{item.email}</small>
                </td>
              ),
              ...permissions.reduce((acc, perm) => {
                acc[perm.id] = (item) => (
                  <td className="text-center">
                    <CSwitch
                      size="sm"
                      color="success"
                      shape="pill"
                      variant="opposite"
                      checked={userPermissions[item.id]?.has(perm.id) || false}
                      onChange={() => handlePermissionToggle(item.id, perm.id)}
                    />
                  </td>
                );
                return acc;
              }, {}),
            }}
          />
        )}

        <div className="d-flex justify-content-end mt-4">
          <CButton
            color="success"
            className="px-4"
            onClick={() => alert('Permissions updated successfully!')}
          >
            💾 Save Changes
          </CButton>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default Permission;
