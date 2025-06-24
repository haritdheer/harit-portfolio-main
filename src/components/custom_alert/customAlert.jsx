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
          <button
            className="text-white focus:outline-none"
            onClick={handleClose}
          >
           🗙{""}
          </button> 
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
