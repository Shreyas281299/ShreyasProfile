import React from "react";
import "../styles/Intro.css";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import FadeInSection from "./FadeInSection";
import { introContent } from "../constants";

const Intro = () => {
  return (
    <div id="intro">
      <div className="intro-simulation">
        <div
          className="simulation-container"
          role="img"
          aria-label={introContent.terminalAriaLabel}
        >
          <div className="terminal-window">
            <div className="terminal-bar">
              <span></span>
              <span></span>
              <span></span>
              <strong>{introContent.terminalTitle}</strong>
            </div>
            <pre>
              {introContent.profileObject.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </pre>
          </div>
        </div>
      </div>
      <div className="intro-block">
        <div className="intro-title">
          {introContent.greetingPrefix}
          <span className="intro-name">{introContent.name}</span>
          <span className="intro-cursor">{introContent.cursor}</span>
        </div>
        <FadeInSection>
          <div className="signal-strip" aria-label={introContent.focusAriaLabel}>
            {introContent.focusAreas.map((focusArea) => (
              <span key={focusArea}>{focusArea}</span>
            ))}
          </div>
          <div className="intro-desc">{introContent.description}</div>
          <div className="command-card" aria-label={introContent.commandAriaLabel}>
            <span className="command-prompt">{introContent.commandPrompt}</span>
            <span>{introContent.command}</span>
          </div>
          <a
            href={introContent.contactHref}
            target="_blank"
            rel="noopener noreferrer"
            className="intro-contact"
          >
            <EmailRoundedIcon />
            {introContent.contactText}
          </a>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Intro;
