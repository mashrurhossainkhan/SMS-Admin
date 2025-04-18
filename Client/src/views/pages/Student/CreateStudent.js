import { TheSidebar, TheFooter, TheHeader } from '../../../containers/index';
import Register from '../register/Register';
import StudentTable from './StudentTable';

const CreateStudent = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <Register userTypeProps="2" />
          <StudentTable />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default CreateStudent;
