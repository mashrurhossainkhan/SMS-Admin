import React from "react";
import { CRow, CCol, CWidgetIcon } from "@coreui/react";
import CIcon from "@coreui/icons-react";
const WidgetsDropdown = () => {
  // render
  return (
    <CRow>
      {/* Product Start */}

      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Total Product" header="19" color="warning">
          <CIcon width={24} name="cil-drop" />
        </CWidgetIcon>
      </CCol>

      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Total Paid Orders" header="5" color="success">
          <CIcon width={24} name="cil-credit-card" />
        </CWidgetIcon>
      </CCol>

      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Total Users" header="190" color="success">
          <CIcon width={24} name="cil-check" />
        </CWidgetIcon>
      </CCol>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Total Stores" header="12" color="danger">
          <CIcon width={24} name="cil-ban" />
        </CWidgetIcon>
      </CCol>

      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Stock" header="2043" color="primary">
          <CIcon width={24} name="cil-user" />
        </CWidgetIcon>
      </CCol>

      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Out Of Stock" header="204" color="success">
          <CIcon width={24} name="cil-user" />
        </CWidgetIcon>
      </CCol>

      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Total Orders" header="149" color="danger">
          <CIcon width={24} name="cil-user-unfollow" />
        </CWidgetIcon>
      </CCol>

      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Total Stores" header="306" color="info">
          <CIcon width={24} name="cil-comment-square" />
        </CWidgetIcon>
      </CCol>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Customer" header="64" color="warning">
          <CIcon width={24} name="cil-comment-square" />
        </CWidgetIcon>
      </CCol>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Sales" header="64" color="warning">
          <CIcon width={24} name="cil-comment-square" />
        </CWidgetIcon>
      </CCol>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Demo" header="64" color="warning">
          <CIcon width={24} name="cil-comment-square" />
        </CWidgetIcon>
      </CCol>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Demo" header="64" color="warning">
          <CIcon width={24} name="cil-comment-square" />
        </CWidgetIcon>
      </CCol>
      {/* Comments End */}
    </CRow>

    // press reales start
    // <CRow>
    //   {/* Product Start */}

    //   <CCol xs="12" sm="6" lg="3">
    //     <CWidgetIcon text="Total Post" header="197604" color="warning">
    //       <CIcon width={24} name="cil-drop" />
    //     </CWidgetIcon>
    //   </CCol>

    //   <CCol xs="12" sm="6" lg="3">
    //     <CWidgetIcon text="Total Active post" header="51786" color="success">
    //       <CIcon width={24} name="cil-credit-card" />
    //     </CWidgetIcon>
    //   </CCol>

    //   <CCol xs="12" sm="6" lg="3">
    //     <CWidgetIcon text="Pending post" header="576" color="success">
    //       <CIcon width={24} name="cil-credit-card" />
    //     </CWidgetIcon>
    //   </CCol>

    //   <CCol xs="12" sm="6" lg="3">
    //     <CWidgetIcon text="Total Users" header="196760" color="success">
    //       <CIcon width={24} name="cil-check" />
    //     </CWidgetIcon>
    //   </CCol>
    //   <CCol xs="12" sm="6" lg="3">
    //     <CWidgetIcon text="Active Users" header="1298" color="danger">
    //       <CIcon width={24} name="cil-ban" />
    //     </CWidgetIcon>
    //   </CCol>

    //   <CCol xs="12" sm="6" lg="3">
    //     <CWidgetIcon text="Inactive Users" header="2043" color="primary">
    //       <CIcon width={24} name="cil-user" />
    //     </CWidgetIcon>
    //   </CCol>

    //   <CCol xs="12" sm="6" lg="3">
    //     <CWidgetIcon text="Quarantine Users" header="204" color="success">
    //       <CIcon width={24} name="cil-user" />
    //     </CWidgetIcon>
    //   </CCol>

    //   <CCol xs="12" sm="6" lg="3">
    //     <CWidgetIcon text="Ban Users" header="149" color="danger">
    //       <CIcon width={24} name="cil-user-unfollow" />
    //     </CWidgetIcon>
    //   </CCol>

    //   <CCol xs="12" sm="6" lg="3">
    //     <CWidgetIcon text="Total Comments" header="337306" color="info">
    //       <CIcon width={24} name="cil-comment-square" />
    //     </CWidgetIcon>
    //   </CCol>
    //   <CCol xs="12" sm="6" lg="3">
    //     <CWidgetIcon text="Approved Comments" header="27659" color="warning">
    //       <CIcon width={24} name="cil-comment-square" />
    //     </CWidgetIcon>
    //   </CCol>
    //   <CCol xs="12" sm="6" lg="3">
    //     <CWidgetIcon text="Pending Comments" header="649" color="warning">
    //       <CIcon width={24} name="cil-comment-square" />
    //     </CWidgetIcon>
    //   </CCol>

    //   {/* Comments End */}
    // </CRow>
    // press reales end
  );
};

export default WidgetsDropdown;
