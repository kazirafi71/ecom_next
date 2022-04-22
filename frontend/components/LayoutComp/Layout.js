import React from "react";
import NavbarComp from "../NavbarComp/NavbarComp";

const Layout = ({ children }) => {
  return (
    <div>
      <NavbarComp />
      {children}
    </div>
  );
};

export default Layout;
