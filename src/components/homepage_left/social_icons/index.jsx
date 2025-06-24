import React, { useState } from "react";
import CustomContainer from "../../../containers/customContainer";
import { LuGithub, LuInstagram, LuFacebook, LuLinkedin } from "react-icons/lu";
import { FaSnapchat } from "react-icons/fa6";
import CustomLink from "../../custom_link/customLink";

const SocialIcons = () => {
  const [links, setLinks] = useState({
    github: "https://github.com/haritdheer",
    instagram: "https://instagram.com/harit_dheer",
    facebook: "https://www.facebook.com/hardikharit.dheer?mibextid=ZbWKwL",
    linkedin: "https://linkedin.com/in/harit-dheer-612a28203",
    snapchat: "https://snapchat.com/add/haritdheer2020",
  });
  return (
    <CustomContainer className={"text-2xl flex flex-col gap-y-7"}>
      <CustomLink to={links.github}>
        <LuGithub />
      </CustomLink>
      <CustomLink to={links.instagram}>
        <LuInstagram />
      </CustomLink>
      <CustomLink to={links.facebook}>
        <LuFacebook />
      </CustomLink>
      <CustomLink to={links.linkedin}>
        <LuLinkedin />
      </CustomLink>
      <CustomLink to={links.snapchat}>
        <FaSnapchat />
      </CustomLink>
    </CustomContainer>
  );
};

export default SocialIcons;
