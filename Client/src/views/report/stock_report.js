import React from "react";
import OutOfStockTable from "../base/tables/ReportTable/OutOfStockTable";
import StockReportTable from "../base/tables/ReportTable/StockReportTable";

export default function stock_report() {
  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        <StockReportTable />
      </div>

      <div>
        <OutOfStockTable />
      </div>
    </div>
  );
}
