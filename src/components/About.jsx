import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";
import { aboutContent } from "../constants";

const About = () => {
  const one = (
    <p>
      {aboutContent.introPrefix}
      <b>{aboutContent.currentRole}</b> at
      <a href={aboutContent.companyHref}> {aboutContent.companyName}</a>
      {aboutContent.introSuffix}
    </p>
  );
  const two = <p>{aboutContent.afterHours}</p>;

  return (
    <div id="about">
      <FadeInSection>
        <div className="section-header ">
          <span className="section-title">{aboutContent.sectionTitle}</span>
        </div>
        <div className="about-content">
          <div className="about-description">
            {one}
            {aboutContent.techIntro}
            <ul className="tech-stack">
              {aboutContent.techStack.map((techItem, i) => (
                <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
                  <li>{techItem}</li>
                </FadeInSection>
              ))}
            </ul>
            {two}
          </div>
          <div className="about-image">
            <div
              className="about-image-placeholder"
              aria-label={aboutContent.imageAriaLabel}
            >
              <span>{aboutContent.initials}</span>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default About;
