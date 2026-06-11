import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { externalLinksContent } from "../constants";

const ExternalLinks = ({ githubLink, openLink }) => {
  const isNpmLink = openLink?.includes(externalLinksContent.npmHost);
  const npmLogoSrc = `${import.meta.env.BASE_URL}${externalLinksContent.npmLogoPath}`;

  return (
    <span className="external-links">
      {githubLink && (
        <a
          className="github-icon"
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon
            sx={{
              fontSize: 20,
              color: "inherit",
            }}
          />
        </a>
      )}
      {openLink && (
        <a
          className={isNpmLink ? "npm-icon" : "open-icon"}
          href={openLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {isNpmLink ? (
            <img
              src={npmLogoSrc}
              alt={externalLinksContent.npmAltText}
            />
          ) : (
            <OpenInBrowserIcon
              sx={{
                fontSize: 25,
                color: "inherit",
              }}
            />
          )}
        </a>
      )}
    </span>
  );
};

export default ExternalLinks;
