import React from "react";
import SalesReportTable from "../base/tables/ReportTable/SalesReportTable";
import TotalPaidOrderReport from "../base/tables/ReportTable/TotalPaidOrderReport";

export default function sales_report() {
  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        <SalesReportTable />
      </div>
      <div>
        <TotalPaidOrderReport />
      </div>
    </div>
  );
}
