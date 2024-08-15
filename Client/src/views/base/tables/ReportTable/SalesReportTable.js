import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

export default function SalesReportTable() {
  const table_name = "Sales Report";
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title={` ${table_name}`}
        columns={[
          { title: "", field: "" },
          { title: "", field: "" },
        ]}
        data={data}
      />
    </div>
  );
}
