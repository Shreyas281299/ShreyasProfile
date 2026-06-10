import React from "react";

import "../styles/SidebarNav.css";
import FadeInSection from "./FadeInSection";

import { useMediaQuery } from "@mui/material";
import { navigationContent } from "../constants";

const SidebarNav = () => {
  const isMobile = useMediaQuery("(max-width: 800px)");

  return (
    <div className="sidebar-nav">
      {!isMobile && (
        <div className="sidebar-links">
          {navigationContent.links.map((link, i) => (
            <FadeInSection key={link.href} delay={(i + 1) * 100 + "ms"}>
              <div>
                <a href={link.href}>{link.sidebarLabel}</a>
              </div>
            </FadeInSection>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarNav;
