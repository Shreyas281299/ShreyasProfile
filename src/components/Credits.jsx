import React from "react";
import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";
import { creditsContent } from "../constants";

const Credits = () => {
  return (
    <FadeInSection>
      <div id="credits">
        <div className="ending-credits">
          <div>{creditsContent.builtBy}</div>
          <div>{creditsContent.rights}</div>
        </div>
      </div>
    </FadeInSection>
  );
};

export default Credits;
