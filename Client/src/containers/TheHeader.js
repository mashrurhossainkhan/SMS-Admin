import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// routes config
import routes from "../routes";

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks,
  TheSidebar,
} from "./index";

const TheHeader = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebar = () => {
    dispatch({ type: "set", sidebarShow: sidebarShow === "responsive" ? false : "responsive" });
  };

  const toggleSidebarMobile = () => {
    //alert(JSON.stringify(sidebarShow))

    setOpen(!open);
    console.log(open)
  };

  return (
    <CHeader withSubheader>
       {open ? <TheSidebar/> : ""}
      {/* Mobile Sidebar Toggle */}
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />

     

      {/* Desktop Sidebar Toggle */}
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />

      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        Shahid Titumir Academy Manikganj
      </CHeaderBrand>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif />
        <TheHeaderDropdownTasks />
        <TheHeaderDropdownMssg />
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
