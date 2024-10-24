import { useDispatch, useSelector } from 'react-redux';
import './Table.css';
import { useEffect } from 'react';
import { allNotices } from '../../../actions/noticeActions';

const AllNoticeTable = () => {
  const dispatch = useDispatch();

  const AllNoticesData = useSelector((state) => state.AllNotice);
  const { loading, error, allNotices: allNoticesData } = AllNoticesData;

  useEffect(() => {
    dispatch(allNotices());
  }, [dispatch]);

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Details</th>
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
                <td>{item.date}</td>
                <td>{item.noticeTitle}</td>
                <td>{item.noticeDetails}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllNoticeTable;
