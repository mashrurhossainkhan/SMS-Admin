import React from "react";
import MaterialTable from "material-table";

export default function Manage_GroupOf_user_DataTable() {
  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title="Manage Groups"
        columns={[{ title: "Group Name", field: "name" }]}
        data={[
          { name: "Billing" },
          { name: "Order" },
          { name: "Sales Man" },
          { name: "Strock Manager" },
        ]}
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
