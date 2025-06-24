import classNames from "classnames";
import React from "react";
import "./style.css";
import CustomLink from "../custom_link/customLink";

const CustomButtonAnchor = ({ className, href, title }) => {
  return (
    <CustomLink
      className={"hover:relative hover:!bottom-0"}
      to={href}
      target="_blank"
    >
      <button
        className={classNames(
          className,
          "border-2 px-4 py-2 rounded-md border-cyan-400 text-cyan-400 hover:relative hover:bottom-1 hover:right-1 hover:shadow-cyan-400 button-shadow tracking-wider"
        )}
      >
        {title}
      </button>
    </CustomLink>
  );
};

export default CustomButtonAnchor;
