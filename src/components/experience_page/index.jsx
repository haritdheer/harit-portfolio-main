import React, { useState } from "react";
import PageHeader from "../page_header";
import CustomTabVertical from "../custom_tab/custom_tab_vertical";
import CustomList from "../custom_list";
import CustomTabHorizontal from "../custom_tab/custom_tab_horizontal";
import { useTranslation } from "react-i18next";

const Experiencepage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([
    {
      id: 0,
      label: "Software Developer 1",
      at: "THB, India",
      atUrl: "https://thb.group/",
      duration: "Oct 2024 - Present",
      content: (
        <CustomList
          items={[
            "I design and develop end-to-end web applications, implement dynamic user interfaces",
            "Build efficient frontend components with React.js. I focus on optimizing performance, integrating APIs",
            "Delivering custom solutions tailored to diverse client needs.",
          ]}
        />
      ),
    },
    {
      id: 1,
      label: "AI Specialist Contractual",
      at: "Pikkles, Japan",
      atUrl: "https://pikkles.com/en/",
      duration: "July 2024 - Present",
      content: (
        <CustomList
          items={[
            "Developing and fine-tuning AI models for real-time data analysis and decision-making",
            "Implemented machine learning algorithms and deep learning techniques for various AI-driven applications",
            "Currently optimizing neural networks and designing custom AI solutions for diverse client projects.",
          ]}
        />
      ),
    },
    {
      id: 2,
      label: "Software Developer Intern",
      at: "Modgenics, Hyderabad",
      atUrl: "https://www.modgenics.co",
      duration: "July 2023 - June 2024",
      content: (
        <CustomList
          items={[
            "Translating Wireframes and PSD Designs into functional web apps using MERN / Mysql.",
            "Binding of UI elements to JavaScript object models.",
            "Creating RESTful services with Node.js.",
            "Create Unit and Integration tests to ensure the QOC.",
          ]}
        />
      ),
    },
    
    {
      id: 3,
      label: "Full Stack Developer Intern",
      at: "CCBUL India, Bangalore",
      atUrl: "https://ccbul.com",
      duration: "June 2022 - Sep 2022",
      content: (
        <CustomList
          items={[
            "Working on MERN Stack as Full Time Intern.",
            "Have done front-end work on various client projects.",
            "Currently working on designing backend API’s for different projects.",
          ]}
        />
      ),
    },
    {
      id: 4,
      label: "Frontend Developer",
      at: "Pepcoding, Noida",
      atUrl: "https://pepcoding.com",
      duration: "Aug 2021 - Sept 2021",
      content: (
        <CustomList
          items={[
            "Creating responsive, user-friendly web interfaces using React.js and modern front-end technologies",
            "Collaborating with design teams to implement visually appealing and intuitive UI/UX components.",
            "Currently enhancing application performance and maintaining code quality through state management and optimization techniques.",
          ]}
        />
      ),
    },
   
  ]);

  return (
    <PageHeader
      heading={t("experiencePageHeading")}
      headingId="02"
      childrenClass={"items-center"}
    >
      <CustomTabVertical tabs={data} />
      <CustomTabHorizontal tabs={data} />
    </PageHeader>
  );
};

export default Experiencepage;
