import React, { useEffect, useState } from "react";
import CustomContainer from "../../containers/customContainer";
import classNames from "classnames";
import CustomTypewriter from "../custom_typewriter";
import CustomButton from "../custom_button/customButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { parseJSONArray } from "../../utils/json-util";

const Homepage = ({ className }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState({
    name: "",
    designation: [],
    bio: "",
  });

  useEffect(() => {
    setData({
      name: t("name"),
      designation: parseJSONArray(t("designation")),
      bio: t("homeIntro2"),
    });
  }, [t, i18n]);

  const navigate = useNavigate();
  return (
    <CustomContainer
      className={classNames(className, "flex flex-col gap-y-5 tracking-widest")}
    >
      <span className="text-sm md:text-md text-cyan-400">
        {t("homeIntro1")}
      </span>
      <h1 className="text-3xl md:text-7xl font-semibold">{data.name}.</h1>
      <h2 className="text-3xl md:text-7xl font-semibold text-gray-300">
        {t("homeSubIntro1")}{" "}
        <CustomTypewriter cursor={true} loop={true} words={data?.designation} />
        .
      </h2>
      <p className="w-full text-sm md:text-base md:w-1/2 text-pretty">
        {data?.bio}
      </p>
      <CustomButton
        onClick={() => {
          navigate("/about");
        }}
        className={"w-max mt-5"}
        title={t("homeBtn1")}
      />
    </CustomContainer>
  );
};

export default Homepage;
