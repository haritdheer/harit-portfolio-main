import React from "react";
import CustomContainer from "../../containers/customContainer";
import Photo from "../../assets/Photo.jpg";
import "./style.css";

const AboutPageRight = () => {
  return (
    <CustomContainer className={"flex w-1/2 justify-center items-start"}>
      <CustomContainer className={"h-80 w-56 wrapper"}>
        <img src={Photo} className="w-full h-full" />
      </CustomContainer>
      {/* <div className="wrapper_outline"></div> */}
    </CustomContainer>
  );
};

export default AboutPageRight;
