import { TheSidebar, TheFooter, TheHeader } from '../../../containers/index';
import AllNoticeTable from './AllNoticeTable';

const GetAllNotices = () => {
  const sampleData = [
    { id: 1, title: 'Introduction to React', view: 150 },
    { id: 2, title: 'Understanding JavaScript', view: 200 },
    { id: 3, title: 'Mastering CSS', view: 180 },
  ];
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <AllNoticeTable data={sampleData} />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default GetAllNotices;
