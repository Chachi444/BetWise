// Example: DepositPage.js
import React from "react";
import PaystackDeposit from "./PaystackDeposit";
import ManualDeposit from "./ManualDeposit";

const DepositPage = () => (
  <div>
    <PaystackDeposit />
    <div style={{ textAlign: "center", margin: "24px 0", color: "#888" }}>OR</div>
    <ManualDeposit />
  </div>
);

export default DepositPage;