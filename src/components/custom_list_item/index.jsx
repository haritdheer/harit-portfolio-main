import classNames from "classnames";
import React from "react";
import "../custom_list/styles.css";

const CustomListItem = ({ item, className }) => {
  return (
    <li className={classNames(className, "list-disc-cyan-400")}>{item}</li>
  );
};

export default CustomListItem;
