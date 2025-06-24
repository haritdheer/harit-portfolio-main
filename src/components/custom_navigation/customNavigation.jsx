import React from "react";
import { useNavigate } from "react-router-dom";
import CustomContainer from "../../containers/customContainer";
import classNames from "classnames";

const CustomNavigation = ({ href, className, children }) => {
  const navigate = useNavigate();
  return (
    <CustomContainer
      onClick={() => {
        navigate(href);
      }}
      className={classNames(className, "cursor-pointer hover:text-cyan-400")}
    >
      {children}
    </CustomContainer>
  );
};

export default CustomNavigation;
