import { useEffect, useRef, useState } from "react";
import { media, projects, spotlightProjects } from "../data/portfolio";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const getProjectIcon = (href) => (href?.includes("github.com") ? "github" : "external");

function ProjectLinks({ href, packageHref, iconOnly = false }) {
  return (
    <div className={`project-links ${iconOnly ? "project-icon-links" : "talk-actions"}`.trim()}>
      {href && (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Open project">
          {iconOnly ? <Icon name={getProjectIcon(href)} /> : "View project"}
        </a>
      )}
      {packageHref && (
        <a href={packageHref} target="_blank" rel="noopener noreferrer" aria-label="Open package">
          {iconOnly ? "npm" : "Package"}
        </a>
      )}
    </div>
  );
}

export function Software() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState("slide-left");
  const touchStartX = useRef(null);
  const activeProject = spotlightProjects[activeIndex];
  const activeMedia = media[activeProject.mediaKey];
  const goToNextProject = () => {
    setTransitionDirection("slide-left");
    setActiveIndex((index) => (index + 1) % spotlightProjects.length);
  };
  const goToPreviousProject = () => {
    setTransitionDirection("slide-right");
    setActiveIndex((index) => (index - 1 + spotlightProjects.length) % spotlightProjects.length);
  };
  const goToProject = (index) => {
    setTransitionDirection(index > activeIndex ? "slide-left" : "slide-right");
    setActiveIndex(index);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setTransitionDirection("slide-left");
      setActiveIndex((index) => (index + 1) % spotlightProjects.length);
    }, 5000);

    return () => window.clearInterval(timerId);
  }, []);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };
  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) {
      return;
    }

    const swipeDistance = touchStartX.current - event.changedTouches[0].clientX;
    touchStartX.current = null;

    if (Math.abs(swipeDistance) < 45) {
      return;
    }

    if (swipeDistance > 0) {
      goToNextProject();
    } else {
      goToPreviousProject();
    }
  };

  return (
    <section id="software" className="page-section software-section">
      <Reveal>
        <SectionHeading title="software" />
      </Reveal>

      <Reveal
        className="spotlight"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`spotlight-media ${transitionDirection}`}
          key={`media-${activeProject.name}`}
        >
          {activeProject.type === "video" ? (
            <video src={activeMedia} autoPlay muted loop playsInline />
          ) : (
            <img src={activeMedia} alt={activeProject.name} />
          )}
        </div>
        <div
          className={`spotlight-caption ${transitionDirection}`}
          key={`caption-${activeProject.name}`}
        >
          <p>{activeProject.description}</p>
          <span className="spotlight-tech">{activeProject.tech}</span>
          <ProjectLinks href={activeProject.href} packageHref={activeProject.packageHref} iconOnly />
        </div>
        <button
          aria-label="Previous project"
          className="spotlight-arrow spotlight-arrow-left"
          type="button"
          onClick={goToPreviousProject}
        >
        </button>
        <button
          aria-label="Next project"
          className="spotlight-arrow spotlight-arrow-right"
          type="button"
          onClick={goToNextProject}
        >
        </button>
        <div className="spotlight-dots" aria-label="Spotlight projects">
          {spotlightProjects.map((project, index) => (
            <button
              aria-label={`Show ${project.name}`}
              className={activeIndex === index ? "is-active" : ""}
              key={project.name}
              onClick={() => goToProject(index)}
              type="button"
            />
          ))}
        </div>
      </Reveal>

      <div className="spotlight-mobile">
        {spotlightProjects.map((project) => (
          <Reveal className="project-card" key={project.name}>
            <ProjectCard project={project} includeMedia />
          </Reveal>
        ))}
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <Reveal className="project-card" key={project.name}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, includeMedia = false }) {
  const asset = project.mediaKey ? media[project.mediaKey] : null;

  return (
    <>
      <div className="card-top">
        <Icon name="folder" className="folder-icon" />
        <ProjectLinks href={project.href} packageHref={project.packageHref} iconOnly />
      </div>
      <h3>{project.name}</h3>
      {includeMedia && asset && (
        <div className="mobile-media">
          {project.type === "video" ? (
            <video src={asset} autoPlay muted loop playsInline />
          ) : (
            <img src={asset} alt={project.name} />
          )}
        </div>
      )}
      <p>{project.description}</p>
      <span className="card-tech">{project.tech}</span>
    </>
  );
}
