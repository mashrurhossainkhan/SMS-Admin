import { TheSidebar, TheFooter, TheHeader } from '../../../containers/index';
import Register from '../register/Register';

const CreateTeachers = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <Register userTypeProps="3" />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default CreateTeachers;
