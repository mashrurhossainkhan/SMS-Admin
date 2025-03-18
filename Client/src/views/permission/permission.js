import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CDataTable,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CSpinner,
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
                    <input
                      type="checkbox"
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
        <div className="d-flex justify-content-end mt-3">
          <CButton
            color="success"
            onClick={() => alert('Permissions updated successfully!')}
          >
            Save Changes
          </CButton>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default Permission;
