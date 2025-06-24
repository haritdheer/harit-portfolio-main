import React, { useEffect, useState } from "react";
import CustomContainer from "../../../containers/customContainer";
import CustomNavigation from "../../custom_navigation/customNavigation";
import CustomButton from "../../custom_button/customButton";
import CustomHamburger from "../../custom_hamburger";
import NavbarRightSmall from "../navbar_right_small";
import { useTranslation } from "react-i18next";

const NavbarRightComponents = ({ compos = [] }) => {
  const { t } = useTranslation();
  return (
    <CustomContainer
      className={"hidden md:flex gap-x-8 text-sm items-center tracking-wider"}
    >
      {compos.map((val, key) => {
        return (
          <CustomNavigation
            href={val?.utm}
            className={"hover:bottom-0 flex gap-x-2"}
            key={key}
          >
            <span className="text-cyan-400">{val.id}.</span> {val?.name}
          </CustomNavigation>
        );
      })}
      <CustomButton
        onClick={() => {
          window.open(
            "https://drive.google.com/file/d/1ca7Ine6yG0OCrpP3wxuie7vNrBOZeIhM/view?usp=drive_link",
            "_blank"
          );
        }}
        title={t("navbarCompo5")}
      />
    </CustomContainer>
  );
};

const NavbarRight = () => {
  const { t, i18n } = useTranslation();
  const [compos, setCompos] = useState([
    { id: "01", name: "About", utm: "/about" },
    { id: "02", name: "Experience", utm: "/experience" },
    { id: "03", name: "Education", utm: "/education" },
    { id: "04", name: "Contact", utm: "/contact" },
  ]);

  useEffect(() => {
    const updatedCompos = compos.map((compo, key) => ({
      ...compo,
      name: t(`navbarCompo${key + 1}`),
    }));

    setCompos(updatedCompos);
  }, [t, i18n.language]);

  const [isHamOpen, setIsHamOpen] = useState(false);

  return (
    <CustomContainer>
      <NavbarRightComponents compos={compos} />
      <CustomContainer className={"flex md:hidden"}>
        <CustomHamburger onClick={() => setIsHamOpen(!isHamOpen)} />
        <NavbarRightSmall isHamOpen={isHamOpen}>
          <CustomContainer
            className={
              "flex flex-col h-full gap-y-10 text-sm justify-center items-center tracking-wider"
            }
          >
            {compos.map((val, key) => {
              return (
                <CustomNavigation
                  href={val?.utm}
                  className={"hover:bottom-0 flex gap-x-2"}
                  key={key}
                >
                  <span className="text-cyan-400">{val.id}.</span> {val?.name}
                </CustomNavigation>
              );
            })}
            <CustomButton
              onClick={() => {
                window.open(
                  "https://drive.google.com/file/d/1ca7Ine6yG0OCrpP3wxuie7vNrBOZeIhM/view?usp=drive_link",
                  "_blank"
                );
              }}
              title={t("navbarCompo5")}
            />
          </CustomContainer>
        </NavbarRightSmall>
      </CustomContainer>
    </CustomContainer>
  );
};

export default NavbarRight;
