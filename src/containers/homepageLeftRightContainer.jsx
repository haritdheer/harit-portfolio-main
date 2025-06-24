import React from "react";
import CustomContainer from "./customContainer";
import CustomLine from "../components/custom_line";
import classNames from "classnames";

const HomepageLeftRightContainer = ({ children, className }) => {
  return (
    <CustomContainer
      className={classNames(
        className,
        "h-full flex flex-col justify-end items-center"
      )}
    >
      {children}
      <CustomLine width={2} height={100} color="#FFFFFF" />
    </CustomContainer>
  );
};

export default HomepageLeftRightContainer;
