import React, { useEffect, useState } from "react";
import CustomContainer from "../../containers/customContainer";
import { useTranslation } from "react-i18next";

const AboutPageLeft = () => {
  const [text, setText] = useState("");
  const { t, i18n } = useTranslation();
  useEffect(() => {
    setText(t("aboutContent"));
  }, [t, i18n.language]);
  return (
    <CustomContainer className={"text-center md:w-1/2"}>
      <p dangerouslySetInnerHTML={{ __html: text }}></p>
    </CustomContainer>
  );
};

export default AboutPageLeft;
