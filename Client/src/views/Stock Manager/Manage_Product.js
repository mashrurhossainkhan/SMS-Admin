import React from "react";
import { Button } from "react-bootstrap";

import ManageProductTable from "../base/tables/MageProductTable";

export default function Manage_Order() {
  return (
    <div>
      <a href="#">
        <Button className="mb-3" variant="primary">
          Add Product
        </Button>
      </a>

      <ManageProductTable />
    </div>
  );
}
