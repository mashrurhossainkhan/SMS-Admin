import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../base/tables/User_Manage_DataTable";

export default function Manage_user() {
  return (
    <div>
      <Link className="btn btn-info mb-2" to="/user/add_user">
        Add User
      </Link>
      <DataTable />
    </div>
  );
}
