import { TheSidebar, TheFooter, TheHeader } from '../../../containers/index';
import Register from '../register/Register';
import TeacherTable from './TeacherTable';

const CreateTeachers = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <Register userTypeProps="3" />
          <TeacherTable/>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default CreateTeachers;
