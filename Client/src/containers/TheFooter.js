import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Famouse Auto
        </a>
        <span className="ml-1">&copy; 2021 All Rights Reserved.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Developed by</span>
        <a
          href="http://softronixs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Softronixs Ltd.
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
