import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

export default function DepositTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title="StockReport"
        columns={[
          { title: "Product Name", field: "username" },
          { title: "QTY", field: "address.zipcode" },
        ]}
        data={data}
      />
    </div>
  );
}
