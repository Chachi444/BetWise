import React from "react";
import Navbar from "./Navbar";

const AuthenticatedLayout = ({ children }) => (
  <div>
    <Navbar />
    <div>
      {children}
    </div>
  </div>
);

export default AuthenticatedLayout;