import React from "react";
import CustomContainer from "../../../containers/customContainer";
import "./style.css";

const NavbarRightSmall = ({ isHamOpen, children }) => {
  return (
    <CustomContainer
      className={`navbar-small ${isHamOpen ? "visible z-50" : ""}`}
    >
      {children}
    </CustomContainer>
  );
};

export default NavbarRightSmall;
