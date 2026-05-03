import React from "react";
import ProfileNavbar from "../components/navbar/profileNavbar";
import SiteFooter from "../components/footer";
import CosmosBackground from "../components/cosmos_background";
import useIsMobile from "../utils/useIsMobile";

const ProfileLayout = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div
      className="scan-lines"
      style={{
        minHeight: "100vh",
        background: "#030C1A",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <CosmosBackground />

      <div style={{ position: "relative", zIndex: 10 }}>
        <ProfileNavbar />
      </div>

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: isMobile
            ? "1.25rem 1rem 3.5rem"
            : "2rem 5rem 3.5rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        {children}
      </main>

      <SiteFooter />
    </div>
  );
};

export default ProfileLayout;
