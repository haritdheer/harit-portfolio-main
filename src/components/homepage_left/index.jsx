import React from "react";
import SocialIcons from "./social_icons";
import HomepageLeftRightContainer from "../../containers/homepageLeftRightContainer";

const HomepageLeft = () => {
  return (
    <HomepageLeftRightContainer className={"gap-y-7"}>
      <SocialIcons />
    </HomepageLeftRightContainer>
  );
};

export default HomepageLeft;
