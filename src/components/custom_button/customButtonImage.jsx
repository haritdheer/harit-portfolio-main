import React from "react";
import CustomButton from "./customButton";

const CustomButtonImage = ({ img, className, onClick = () => {} }) => {
  return (
    <CustomButton className={className} onClick={onClick}>
      <img src={img} alt="Can't load image" />
    </CustomButton>
  );
};

export default CustomButtonImage;
