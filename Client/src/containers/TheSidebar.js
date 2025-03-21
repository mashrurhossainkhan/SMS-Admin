import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';

// Sidebar navigation config
import navigation from './_nav';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  // Handle sidebar state change
  const handleSidebarChange = (val) => {
    dispatch({ type: 'set', sidebarShow: val });
  };

  return (
    <>
      <CSidebar>
        <CSidebarBrand className="d-md-down-none" to="/">
          <p style={{ padding: '10px', fontSize: '20px', color: 'white' }}>
            Shahid Titumir Academy Manikganj
          </p>
        </CSidebarBrand>
        <CSidebarNav>
          <CCreateElement
            items={navigation}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        </CSidebarNav>
        <CSidebarMinimizer className="c-d-md-down-none" />
      </CSidebar>
    </>
  );
};

export default React.memo(TheSidebar);
