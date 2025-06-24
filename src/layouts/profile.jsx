import React, { useEffect, useState } from "react";
import ProfileNavbar from "../components/navbar/profileNavbar";
import CustomContainer from "../containers/customContainer";
import HomepageRight from "../components/homepage_right";
import HomepageLeft from "../components/homepage_left";
import CustomAlert from "../components/custom_alert/customAlert";
import ParticleBackground from "../components/particle_component/particle_background";
import CustomConsole from "../components/custom_console";
import CustomButton from "../components/custom_button/customButton";
import CustomButtonImage from "../components/custom_button/customButtonImage";
import { useTranslation } from "react-i18next";
import EN from "../assets/en-icon.png";
import DE from "../assets/de-icon.png";
import HI from "../assets/hi-icon.png";

const ProfileLayout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

  const LANGS = ["en", "de", "hi"];
  const iconMap = { en: EN, de: DE, hi: HI };

  const getNextLang = () => {
    const idx = LANGS.indexOf(lang);
    return LANGS[(idx + 1) % LANGS.length];
  };

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <CustomContainer className="h-screen w-screen">
      <ParticleBackground />
      <ProfileNavbar className={"h-1/8 z-50"} />
      <CustomContainer className="flex text-white h-7/8">
        {showAlert && (
          <CustomAlert
            message={t("underDevelopmentAlert")}
            type="danger"
            closable
            onClose={() => setShowAlert(false)}
          />
        )}

        <CustomContainer className="hidden md:block md:w-1/8 overflow-hidden z-10">
          <HomepageLeft />
        </CustomContainer>
        <CustomContainer className="w-full p-7 pt-16 md:w-7/8 md:p-24 overflow-auto z-10">
          {children}
        </CustomContainer>
        <CustomContainer className="hidden md:block md:w-1/8 overflow-hidden z-10">
          <HomepageRight />
        </CustomContainer>
        <CustomButtonImage
          className={
            "!border-0 hover:shadow-none absolute bottom-2 right-2 md:bottom-4 md:right-4 z-50 hover:!absolute hover:bottom-4 hover:right-4 w-24 md:w-28"
          }
          img={iconMap[getNextLang()]}
          onClick={() => changeLang(getNextLang())}
        />
      </CustomContainer>
      <CustomConsole />
    </CustomContainer>
  );
};

export default ProfileLayout;
