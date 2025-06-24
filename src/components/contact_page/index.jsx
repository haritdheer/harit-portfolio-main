import React, { useState } from "react";
import PageHeader from "../page_header";
import CustomContainer from "../../containers/customContainer";
import CustomButtonAnchor from "../custom_button/customButtonAnchor";
import { useTranslation } from "react-i18next";

const Contactpage = () => {
  const [mail, setMail] = useState("haritdheer@gmail.com");
  const { t } = useTranslation();
  return (
    <PageHeader
      heading={t("contactPageHeading")}
      headingId="04"
      className={"h-full"}
      childrenClass={"w-full h-full"}
    >
      <CustomContainer
        className={
          "h-full flex flex-col items-center justify-center gap-y-5 md:gap-y-10"
        }
      >
        <h3 className="text-3xl md:text-6xl font-bold">
          {t("contactPageSubHeading")}
        </h3>
        <p className="w-full md:w-1/2 text-center text-md">
          {t("contactPageContent")}
        </p>
        <CustomButtonAnchor
          href={`mailto:${mail}`}
          title={t("contactPageBtn1")}
        />
      </CustomContainer>
    </PageHeader>
  );
};

export default Contactpage;
