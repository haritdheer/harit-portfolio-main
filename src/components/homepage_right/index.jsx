import React from "react";
import HomepageLeftRightContainer from "../../containers/homepageLeftRightContainer";
import EmailLink from "./email_link";

const HomepageRight = () => {
  return (
    <HomepageLeftRightContainer className={"gap-y-40"}>
      <EmailLink />
    </HomepageLeftRightContainer>
  );
};

export default HomepageRight;
