import React from "react";
import CustomContainer from "../../../containers/customContainer";
import CustomLink from "../../custom_link/customLink";

const EmailLink = () => {
  return (
    <CustomContainer className={"rotate-90 tracking-widest"}>
      <CustomLink
        to={"mailto:haritdheer@gmail.com"}
        className={"hover:right-2 hover:!bottom-0"}
      >
        haritdheer@gmail.com
      </CustomLink>
    </CustomContainer>
  );
};

export default EmailLink;
