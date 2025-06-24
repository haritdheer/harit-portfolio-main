import React from "react";
import "./styles.css";

const CustomHamburger = ({ onClick }) => {
  return (
    <input
      type="checkbox"
      role="button"
      aria-label="Display the menu"
      className="menu"
      onClick={onClick}
    />
  );
};

export default CustomHamburger;
