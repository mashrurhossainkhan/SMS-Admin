import React from "react";
import { Button } from "react-bootstrap";

import ManageOrderTable from "../base/tables/MageOrderTable";

export default function Manage_Order() {
  return (
    <div>
      <a href="/order/add_order">
        <Button className="mb-3" variant="primary">
          Add Order
        </Button>
      </a>

      <ManageOrderTable />
    </div>
  );
}
