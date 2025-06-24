import React from "react";
import classNames from "classnames";

const CustomContainer = ({ className, children, onClick = () => {} }) => {
  return (
    <div onClick={onClick} className={classNames(className)}>
      {children}
    </div>
  );
};

export default CustomContainer;
