import { useDispatch, useSelector } from 'react-redux';
import './Table.css';
import { useEffect, useState } from 'react';
import { allNotices } from '../../../actions/noticeActions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { API } from '../../../actions/api';

const AllNoticeTable = () => {
  const dispatch = useDispatch();
  const [editingNotice, setEditingNotice] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [editDate, setEditDate] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDetails, setEditDetails] = useState('');

  const AllNoticesData = useSelector((state) => state.AllNotice);
  const { loading, error, allNotices: allNoticesData } = AllNoticesData;

  useEffect(() => {
    dispatch(allNotices());
  }, [dispatch]);

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setEditDate(notice.date?.split('T')[0]);
    setEditTitle(notice.noticeTitle);
    setEditDetails(notice.noticeDetails);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${API}/api/notice/update/${editingNotice.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: editDate,
            noticeTitle: editTitle,
            noticeDetails: editDetails,
            noticeFile: null, // Optional if you don't use it
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert('✅ Notice updated successfully!');
        setShowModal(false);
        dispatch(allNotices()); // Refresh the notice list
      } else {
        alert(
          '❌ Failed to update notice: ' + (result.message || 'Unknown error')
        );
      }
    } catch (error) {
      console.error('Error updating notice:', error);
      alert('❌ Server error while updating notice');
    }
  };

  const handleDelete = async (noticeId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this notice?'
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API}/api/notice/update/visibility/false/${noticeId}`,
        {
          method: 'PUT',
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert('🗑️ Notice deleted (visibility set to false).');
        dispatch(allNotices()); // Refresh notice list
      } else {
        alert('❌ Failed to delete: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('❌ Server error while deleting');
    }
  };

  return (
    <div className="table-container">
      <h2>All Notices</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="4">Something went wrong!</td>
            </tr>
          ) : (
            (allNoticesData || []).map((item, index) => (
              <tr key={index}>
                <td>{item.date?.split('T')[0]}</td>
                <td>{item.noticeTitle}</td>
                <td
                  dangerouslySetInnerHTML={{ __html: item.noticeDetails }}
                ></td>
                <td>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      background: 'linear-gradient(to right, #42a5f5, #1e88e5)',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      marginRight: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = 0.9)}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      background: 'linear-gradient(to right, #ef5350, #e53935)',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = 0.9)}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Notice</h3>
            <label>Date</label>
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />

            <label>Title</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <label>Details</label>
            <ReactQuill value={editDetails} onChange={setEditDetails} />

            <div className="modal-actions">
              <button className="modal-button save" onClick={handleSave}>
                💾 Save
              </button>
              <button
                className="modal-button cancel"
                onClick={() => setShowModal(false)}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllNoticeTable;
