import React from "react";
import Logo from "../../../assets/K-Logo-removebg-preview-removebg-preview.png";
import { useNavigate } from "react-router-dom";

const NavbarLeft = () => {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => navigate("/")}
      className="h-12 cursor-pointer"
      src={Logo}
      alt="Logo"
    />
  );
};

export default NavbarLeft;
