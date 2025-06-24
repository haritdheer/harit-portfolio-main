// DynamicAlert.js
import classNames from "classnames";
import React, { useState } from "react";

const CustomAlert = ({ message, type, onClose }) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleClose = () => {
    setShowAlert(false);
    onClose();
  };

  const alertClasses = `absolute top-15 left-0 right-0 p-4 text-white ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  } ${showAlert ? "block" : "hidden"}`;

  return (
    <div className={classNames(alertClasses, "z-40")}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between text-xs md:text-base">
          <span>{message}</span>
          {/* TODO: Remaining to configure close button */}
          {/* <button
            className="text-white focus:outline-none"
            onClick={handleClose}
          >
            <svg
              className="h-6 w-6 fill-current"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                fillRule="evenodd"
                d="M14.348 5.879a1 1 0 0 1 1.414 0L18.92 9.05a1 1 0 0 1 0 1.414l-2.121 2.121a1 1 0 0 1-1.414-1.414l2.121-2.121a1 1 0 0 0 0-1.414l-2.121-2.121a1 1 0 0 1 0-1.414zM10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
              />
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
