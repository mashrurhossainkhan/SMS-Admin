import React from 'react';
import CIcon from '@coreui/icons-react';
var userInfo = JSON.parse(
  localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK')
);
const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  // User
  {
    _tag: 'CSidebarNavDropdown',
    name: 'User',
    route: '/user',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add User',
        to: '/user/add_user',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Manage Of User',
        to: '/user/manage_user',
      },
    ],
  },

  //notice_board
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Notice Board',
    route: '/notice_board',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Create',
        to: '/notice_board/create',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Manage',
        to: '/notice_board/manage/all',
      },
    ],
  },

  // User Group
  /*{
    _tag: "CSidebarNavDropdown",
    name: "User Group",
    route: "/user_Group",
    icon: "cil-puzzle",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add Group",
        to: "/user_group/add_group",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Manage Group Of User",
        to: "/user_group/manage_group_user",
      },
    ],
  }*/

  // Brand
  /*
  {
    _tag: "CSidebarNavItem",
    name: "Brand",
    to: "/brand",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
*/
];

if (userInfo) {
  if (userInfo.isAdmin != 1) _nav.splice(1, 1);
}
export default _nav;
