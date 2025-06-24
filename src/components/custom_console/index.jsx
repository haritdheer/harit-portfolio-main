import React, { useEffect, useState } from "react";
import "./styles.css"; // Make sure to create a corresponding CSS file
import CustomContainer from "../../containers/customContainer";
import { IoCloseCircleOutline } from "react-icons/io5";
import fetchCommit from "./apiCall";
import { Link } from "react-router-dom";

const CustomConsole = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleConsole = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (isVisible === true) {
      const fetchData = async () => {
        try {
          const response = await fetchCommit();
          setData(response.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
      console.log("API hit");
    }
  }, [isVisible]);

  return (
    <CustomContainer>
      <button onClick={toggleConsole} className="console-button">
        Console
      </button>
      <div className={`dark-console ${isVisible ? "visible" : ""}`}>
        <div className="console-content">
          <CustomContainer className={"flex justify-end"}>
            <IoCloseCircleOutline
              className="cursor-pointer text-red-300 text-lg"
              onClick={toggleConsole}
            />
          </CustomContainer>
          <p>Welcome to the console!</p>
          {loading == true && data === null ? (
            <p>"Fetching Data, Please wait!!"</p>
          ) : (
            <p>
              Current Version: {data[0]?.commit?.message} by{" "}
              <Link
                target="_blank"
                to={data[0]?.html_url}
                className="text-cyan-400 cursor-pointer hover:underline"
              >
                {data[0]?.commit?.author?.name}
              </Link>
            </p>
          )}
        </div>
      </div>
    </CustomContainer>
  );
};

export default CustomConsole;
