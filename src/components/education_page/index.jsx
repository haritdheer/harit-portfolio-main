import React, { useState } from "react";
import PageHeader from "../page_header";
import CustomTabVertical from "../custom_tab/custom_tab_vertical";
import CustomList from "../custom_list";
import CustomTabHorizontal from "../custom_tab/custom_tab_horizontal";
import { useTranslation } from "react-i18next";

const Educationpage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([
    // {
    //   id: 0,
    //   label: "Master of Science (High Integrity Systems)",
    //   at: "FraUAS, Frankfurt",
    //   atUrl: "https://www.frankfurt-university.de/",
    //   duration: "April 2024 - Pursuing",
    //   content: (
    //     <CustomList
    //       items={[
    //         "Developed proficiency in programming languages such as [List languages, e.g., Java, C++, Python]",
    //         "Collaborated with peers on group projects, fostering teamwork and communication skills",
    //         "Applied academic knowledge in a practical setting during internships or work experiences.",
    //         "Engaged in relevant extracurricular activities, such as coding competitions, hackathons, or computer science clubs.",
    //       ]}
    //     />
    //   ),
    // },
    {
      id: 0,
      label: "Bachelors of Engineering (Computer Engg.)",
      at: "GGSIPU, New Delhi",
      atUrl: "https://www.ipu.ac.in",
      duration: "Dec 2020 - June 2024",
      content: (
        <CustomList
          items={[
            "Developed proficiency in programming languages such as [List languages, e.g., Java, C++, Python]",
            "Collaborated with peers on group projects, fostering teamwork and communication skills",
            "Applied academic knowledge in a practical setting during internships or work experiences.",
            "Engaged in relevant extracurricular activities, such as coding competitions, hackathons, or computer science clubs.",
          ]}
        />
      ),
    },
    {
      id: 1,
      label: "HSC",
      at: "DPS, Bikaner",
      atUrl: "http://dpisbikaner.com/",
      duration: "Mar 2018 - Apr 2020",
      content: (
        <CustomList
          items={[
            "Achieved a commendable academic performance with a focus on the PCM subjects.",
            "Successfully completed advanced mathematics courses, showcasing strong analytical and problem-solving skills.",
            "Engaged in practical work and projects related to Physics and Chemistry, demonstrating hands-on application of theoretical knowledge.",
            "Gained basic technology and computing skills, which complement the scientific knowledge acquired during high school.",
          ]}
        />
      ),
    },
    {
      id: 2,
      label: "SSC",
      at: "RSV, Bikaner",
      atUrl: "https://rsvschool.com/",
      duration: "Mar 2016 - Apr 2018",
      content: (
        <CustomList
          items={[
            "Emphasized proficiency in core subjects such as Mathematics, Science, English, and others as per the curriculum.",
            "Engaged in extracurricular activities, demonstrating a well-rounded skill set beyond academics.",
            "Developed strong problem-solving abilities through coursework, particularly in subjects like Mathematics and Science",
          ]}
        />
      ),
    },
  ]);
  return (
    <PageHeader heading={t("educationPageHeading")} headingId="03">
      <CustomTabVertical tabs={data} />
      <CustomTabHorizontal tabs={data} />
    </PageHeader>
  );
};

export default Educationpage;
