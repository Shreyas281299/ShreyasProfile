import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import { Carousel } from "react-bootstrap";
import ExternalLinks from "./ExternalLinks";
import flappyBirdVideo from "../assets/Flappy-bird.mov";
import webexCallingExtensionImage from "../assets/Webex-calling-extension.png";
import { projectsContent } from "../constants";

const mediaAssets = {
  flappyBirdVideo,
  webexCallingExtensionImage,
};

const Projects = () => {
  return (
    <div id="projects">
      <div className="section-header ">
        <span className="section-title">{projectsContent.sectionTitle}</span>
        <a
          href={projectsContent.viewAllHref}
          className="explore-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {projectsContent.viewAllText}
        </a>
      </div>
      {projectsContent.showSpotlightCarousel && (
        <>
          <div className="spotlight-projects-desktop">
            <Carousel interval={null}>
              {projectsContent.spotlightProjects.map((project, i) => (
                <Carousel.Item key={i}>
                  {project.mediaId === "flappyBirdVideo" ? (
                    <video
                      className="d-block w-100"
                      src={mediaAssets[project.mediaId]}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      className={`d-block w-100 ${
                        project.imageClass || ""
                      }`}
                      src={mediaAssets[project.mediaId]}
                      alt={project.name}
                    />
                  )}
                  <Carousel.Caption>
                    {project.showTitle !== false && (
                      <h3>{project.title}</h3>
                    )}
                    <div>
                      {project.desc}
                      <div className="techStack">{project.techStack}</div>
                    </div>
                    <ExternalLinks
                      githubLink={project.link}
                      openLink={project.open}
                    />
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className="spotlight-projects-mobile">
            {projectsContent.spotlightProjects.map((project, i) => (
              <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
                <div className="projects-card">
                  <div className="card-header">
                    <div className="folder-icon">
                      <FolderOpenRoundedIcon sx={{ fontSize: 35 }} />
                    </div>
                    <ExternalLinks
                      githubLink={project.link}
                      openLink={project.open}
                    />
                  </div>

                  <a
                    href={project.open || project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-link"
                  >
                    <div className="card-title">{project.title}</div>
                    <div className="spotlight-mobile-image">
                      {project.mediaId === "flappyBirdVideo" ? (
                        <video
                          src={mediaAssets[project.mediaId]}
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          className={project.imageClass || ""}
                          src={mediaAssets[project.mediaId]}
                          alt={project.name}
                        />
                      )}
                    </div>
                  </a>
                  <div className="card-desc">{project.desc}</div>
                  <div className="card-tech">{project.techStack}</div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </>
      )}
      <div className="project-container">
        <ul className="projects-grid">
          {projectsContent.projects.map((project, i) => (
            <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
              <li className="projects-card">
                <div className="card-header">
                  <div className="folder-icon">
                    <FolderOpenRoundedIcon sx={{ fontSize: 35 }} />
                  </div>
                  <ExternalLinks
                    githubLink={project.link}
                    openLink={project.open}
                  />
                </div>

                <div className="card-title">{project.name}</div>
                <div className="card-desc">{project.desc}</div>
                <div className="card-tech">{project.techStack}</div>
              </li>
            </FadeInSection>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
