import React, { useState } from "react";
import { Link } from "react-router-dom";

const CustomTabVertical = ({ tabs = [] }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="hidden md:flex">
      <ul className="flex-col text-sm font-medium md:me-4 mb-4 md:mb-0">
        {tabs.map((tab) => (
          <li className="w-max" key={tab.id}>
            <button
              className={`border-l-2 border-l-gray-600 inline-flex items-center px-4 py-4 ${
                activeTab == tab.id
                  ? "text-cyan-400 border-l-4 !border-l-cyan-400 bg-gray-600"
                  : "hover:bg-gray-600 hover:text-cyan-400"
              } w-full`}
              onClick={() => handleTabClick(tab.id)}
              disabled={tab.disabled}
            >
              {tab.at}
            </button>
          </li>
        ))}
      </ul>
      <div className="px-6 py-2 text-medium text-gray-500 rounded-lg w-full">
        <h3 className="text-lg font-bold text-white mb-2">
          {tabs[activeTab].label}{" "}
          <Link
            className="text-cyan-400 hover:underline hover:underline-offset-8"
            target="_blank"
            to={tabs[activeTab].atUrl}
          >
            @ {tabs[activeTab].at}
          </Link>
        </h3>
        <p className="mb-2">{tabs[activeTab].duration}</p>
        {/* <p dangerouslySetInnerHTML={{ __html: tabs[activeTab].content }}></p> */}
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default CustomTabVertical;
