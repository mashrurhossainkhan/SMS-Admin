import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

export default function CustomersTable(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title="Manage User"
        columns={[
          { title: "Name", field: "name" },
          { title: "Phone", field: "phone" },
          { title: "Email", field: "email" },
          { title: "Address", field: "address.street" },
          { title: "Due", field: "address.geo.lng" },
          { title: "Deposit", field: "address.geo.lat" },
          { title: "Status", field: "" },
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
        }}
      />
    </div>
  );
}
