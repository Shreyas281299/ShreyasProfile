import React from "react";
import "../styles/Art.css";
import FadeInSection from "./FadeInSection";
import { talksContent } from "../constants";

const Art = () => {
  return (
    <div id="art">
      <div className="section-header">
        <span className="section-title">{talksContent.sectionTitle}</span>
      </div>
      <FadeInSection delay="200ms">
        <div className="art-description">{talksContent.description}</div>
      </FadeInSection>
      <div className="art-container">
        <div className="art-grid talks-grid">
          {talksContent.talks.map((talk, i) => (
            <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
              <article className="art-card talk-card">
                <span className="talk-label">{talk.label}</span>
                <h3>{talk.title}</h3>
                <p>{talk.desc}</p>
                <div className="talk-actions">
                  <a
                    className="talk-link"
                    href={talk.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {talksContent.watchText}
                  </a>
                  <a
                    className="talk-link talk-link-secondary"
                    href={talk.sampleHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {talksContent.appText}
                  </a>
                </div>
              </article>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Art;
