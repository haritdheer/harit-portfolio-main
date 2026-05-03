import React from "react";

const PageHeader = ({ children, className, childrenClass, heading = "Section", headingId = "00" }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "2rem", paddingBottom: "2rem" }}
      className={className}
    >
      <div className="section-header">
        <span className="section-id">[{headingId}]</span>
        <span className="section-title">{heading}</span>
        <div className="section-line" />
      </div>
      <div className={childrenClass}>{children}</div>
    </div>
  );
};

export default PageHeader;
