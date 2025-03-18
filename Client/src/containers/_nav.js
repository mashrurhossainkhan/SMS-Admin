import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilHome,
  cilClipboard,
  cilCalendar,
  cilSchool,
  cilUser,
  cilCheckCircle,
  cilChartLine,
  cilCreditCard,
  cilLockUnlocked,
} from '@coreui/icons';

var userInfo = JSON.parse(
  localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK')
);

const _nav = [
  // Dashboard
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon content={cilHome} customClasses="c-sidebar-nav-icon" />,
  },

  // Notice Board
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Notice Board',
    route: '/notice_board',
    icon: <CIcon content={cilClipboard} customClasses="c-sidebar-nav-icon" />,
    _children: [
      { _tag: 'CSidebarNavItem', name: 'Create', to: '/notice_board/create' },
      {
        _tag: 'CSidebarNavItem',
        name: 'Manage',
        to: '/notice_board/manage/all',
      },
    ],
  },

  // Routine
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Routine',
    route: '#',
    icon: <CIcon content={cilCalendar} customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Subject Create',
        to: '/subject/create',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Routine Create',
        to: '/routine/create',
      },
    ],
  },

  // Students
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Students',
    route: '/student',
    icon: <CIcon content={cilSchool} customClasses="c-sidebar-nav-icon" />,
    _children: [
      { _tag: 'CSidebarNavItem', name: 'Create', to: '/student/create' },
    ],
  },

  // Teachers
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Teachers',
    route: '/teacher',
    icon: <CIcon content={cilUser} customClasses="c-sidebar-nav-icon" />,
    _children: [
      { _tag: 'CSidebarNavItem', name: 'Create', to: '/teacher/create' },
    ],
  },
];

// If user exists, add role-based navigation items
if (userInfo) {
  // Attendance Section (For Teachers)
  _nav.push({
    _tag: 'CSidebarNavDropdown',
    name: 'Attendance',
    to: '#',
    icon: <CIcon content={cilCheckCircle} customClasses="c-sidebar-nav-icon" />,
    _children: [
      { _tag: 'CSidebarNavItem', name: 'Add Attendance', to: '/attendance' },
      {
        _tag: 'CSidebarNavItem',
        name: 'Attendance History',
        to: '/attendance/history/dates',
      },
    ],
  });

  // Result Section
  _nav.push({
    _tag: 'CSidebarNavDropdown',
    name: 'Result',
    to: '#',
    icon: <CIcon content={cilChartLine} customClasses="c-sidebar-nav-icon" />,
    _children: [
      { _tag: 'CSidebarNavItem', name: 'Result Type', to: '/add/result/type' },
      { _tag: 'CSidebarNavItem', name: 'Result', to: '/result/all/class' },
    ],
  });

  // Payments Section
  _nav.push({
    _tag: 'CSidebarNavDropdown',
    name: 'Payments',
    to: '#',
    icon: <CIcon content={cilCreditCard} customClasses="c-sidebar-nav-icon" />,
    _children: [
      { _tag: 'CSidebarNavItem', name: 'Credit', to: '/payments/credit' },
      { _tag: 'CSidebarNavItem', name: 'Debit', to: '/payment/debit' },
    ],
  });

  _nav.push({
    _tag: 'CSidebarNavItem',
    name: 'Permission',
    to: '/permission',
    icon: (
      <CIcon content={cilLockUnlocked} customClasses="c-sidebar-nav-icon" />
    ),
  });
}

export default _nav;
