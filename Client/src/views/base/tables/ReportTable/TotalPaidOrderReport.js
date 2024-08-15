import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

export default function TotalPaidOrderReport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title="Total Paid Orders - Report Data"
        columns={[
          { title: "Month - Year", field: "" },
          { title: "Amount", field: "" },
        ]}
        data={data}
      />
    </div>
  );
}
