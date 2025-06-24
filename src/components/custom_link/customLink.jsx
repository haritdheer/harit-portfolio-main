import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

const CustomLink = ({ to, target = "_blank", children, className }) => {
  return (
    <Link
      to={to}
      target={target}
      className={classNames(
        className,
        "cursor-pointer hover:text-cyan-400 hover:relative hover:bottom-2"
      )}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
