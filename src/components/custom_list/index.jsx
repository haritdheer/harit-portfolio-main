// CustomList.jsx
import React from "react";
import CustomListItem from "../custom_list_item";
import classNames from "classnames";

const CustomList = ({ items = [], className, itemClassName }) => {
  return (
    <ul
      className={classNames(
        className,
        "mt-5 custom-list flex flex-col gap-y-2"
      )}
    >
      {items.map((item, index) => (
        <CustomListItem className={itemClassName} key={index} item={item} />
      ))}
    </ul>
  );
};

export default CustomList;
