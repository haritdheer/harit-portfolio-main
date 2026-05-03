import React, { useState } from "react";
import PageHeader from "../page_header";
import AboutPageLeft from "./about_page_left";
import useIsMobile from "../../utils/useIsMobile";
import { LuExternalLink, LuDownload, LuMaximize2, LuMinimize2 } from "react-icons/lu";

const CV_FILE_ID = "1V2qZCDpNIUdcSItXZza-uInG2ny-ZnZ3";
const CV_PREVIEW  = `https://drive.google.com/file/d/${CV_FILE_ID}/preview`;
const CV_DOWNLOAD = `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`;
const CV_VIEW     = `https://drive.google.com/file/d/${CV_FILE_ID}/view?usp=sharing`;

const CvPanel = () => {
  const [expanded, setExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="term-window"
      style={{
        position: "sticky",
        top: 80,
        display: "flex",
        flexDirection: "column",
        height: expanded ? "85vh" : 540,
        transition: "height 0.3s ease",
      }}
    >
      {/* titlebar */}
      <div className="term-titlebar" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="term-dot" style={{ background: "#FF4444" }} />
          <span className="term-dot" style={{ background: "#F6C90E" }} />
          <span className="term-dot" style={{ background: "#00FF88" }} />
          <span style={{ marginLeft: "0.25rem" }}>harit_dheer_cv.pdf</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <a
            href={CV_DOWNLOAD}
            target="_blank"
            rel="noreferrer"
            title="Download CV"
            style={{ color: "#3D5166", display: "flex", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00D4FF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3D5166")}
          >
            <LuDownload size={13} />
          </a>
          <a
            href={CV_VIEW}
            target="_blank"
            rel="noreferrer"
            title="Open in new tab"
            style={{ color: "#3D5166", display: "flex", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00D4FF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3D5166")}
          >
            <LuExternalLink size={13} />
          </a>
          <button
            onClick={() => setExpanded(!expanded)}
            title={expanded ? "Collapse" : "Expand"}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#3D5166", display: "flex", padding: 0, transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00D4FF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3D5166")}
          >
            {expanded ? <LuMinimize2 size={13} /> : <LuMaximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* prompt line */}
      <div
        style={{
          padding: "0.4rem 1.25rem",
          borderBottom: "1px solid rgba(0,212,255,0.08)",
          fontSize: "0.65rem",
          color: "#3D5166",
        }}
      >
        <span style={{ color: "#00D4FF" }}>$</span> open harit_dheer_cv.pdf
      </div>

      {/* iframe */}
      <div style={{ flex: 1, position: "relative", background: "#020A16" }}>
        {!loaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            <div style={{ fontSize: "0.65rem", color: "#3D5166" }}>
              loading cv<span className="cursor-blink" />
            </div>
          </div>
        )}
        <iframe
          src={CV_PREVIEW}
          title="Harit Dheer CV"
          onLoad={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
          allow="autoplay"
        />
      </div>

      {/* footer bar */}
      <div
        style={{
          padding: "0.35rem 1.25rem",
          borderTop: "1px solid rgba(0,212,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.58rem",
          color: "#3D5166",
        }}
      >
        <span>harit_dheer_resume.pdf</span>
        <a
          href={CV_VIEW}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#00D4FF", textDecoration: "none", letterSpacing: "0.06em" }}
        >
          open full ↗
        </a>
      </div>
    </div>
  );
};

const Aboutpage = () => {
  const isMobile = useIsMobile();

  return (
    <PageHeader heading="About Me" headingId="01">
      <div
        style={{
          display: isMobile ? "flex" : "grid",
          flexDirection: "column",
          gridTemplateColumns: "minmax(0,1.1fr) minmax(0,0.9fr)",
          gap: isMobile ? "1.5rem" : "2rem",
          alignItems: isMobile ? "stretch" : "start",
        }}
      >
        <AboutPageLeft />
        <CvPanel />
      </div>
    </PageHeader>
  );
};

export default Aboutpage;
