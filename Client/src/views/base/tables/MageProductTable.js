import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

export default function ManageProductTable() {
  const table_name = "Product";
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title={`Manage ${table_name}`}
        columns={[
          { title: "Bil No", field: "id" },
          { title: "Customer Name", field: "name" },
          { title: "Customer Address", field: "address.street" },
          { title: "Total Product", field: "address.geo.lat" },
          { title: "Paid By", field: "username" },
          { title: "Process By", field: "name" },
          { title: "Total Amount", field: "address.geo.lat" },
          { title: "Paid Status", field: "" },
          { title: "Date Time", field: "address.zipcode" },
        ]}
        data={data}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit User",
            onClick: (event, rowData) => alert("You Edit " + rowData.name),
          },
          (rowData) => ({
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) =>
              window.confirm("You want to delete " + rowData.name),
            disabled: rowData.birthYear < 2000,
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          //   filtering: true,
        }}
      />
    </div>
  );
}
