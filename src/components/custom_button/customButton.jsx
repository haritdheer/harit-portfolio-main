import classNames from "classnames";
import React from "react";
import "./style.css";

const CustomButton = ({ className, onClick = () => {}, title, children }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        className,
        "border-2 px-4 py-2 rounded-md border-cyan-400 text-cyan-400 hover:relative hover:bottom-1 hover:right-1 hover:shadow-cyan-400 button-shadow tracking-wider"
      )}
    >
      {title || children}
    </button>
  );
};

export default CustomButton;
