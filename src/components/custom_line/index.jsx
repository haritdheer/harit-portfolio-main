import React, { useState, useEffect } from "react";
import classNames from "classnames";

const CustomLine = ({ width, height, color, className }) => {
  const [dynamicStyles, setDynamicStyles] = useState({
    width: "100px",
    height: "100px",
    backgroundColor: "#3498db",
  });

  useEffect(() => {
    setDynamicStyles({
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: color,
    });
  }, [width, height, color]);
  return (
    <div
      className={classNames(className, "dynamic-height")}
      style={dynamicStyles}
    ></div>
  );
};

export default CustomLine;
