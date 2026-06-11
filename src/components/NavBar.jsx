import React, { useState, useEffect, useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import "../styles/NavBar.css";
import { navigationContent } from "../constants";

const withBasePath = (path) => `${import.meta.env.BASE_URL}${path}`;

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const scrollPos = useRef(0);

  useEffect(() => {
    if (expanded) {
      scrollPos.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPos.current}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }, [expanded]);

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className="navbar"
      data-bs-theme="dark"
      expanded={expanded}
      onToggle={(isExpanded) => setExpanded(isExpanded)}
    >
      <Container>
        <Navbar.Brand href={import.meta.env.BASE_URL}>
          {navigationContent.brand}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onSelect={() => setExpanded(false)}>
            {navigationContent.links.map((link) => (
              <Nav.Link key={link.href} href={withBasePath(link.href)}>
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="ms-auto" onSelect={() => setExpanded(false)}>
            <Nav.Link href={navigationContent.socials.email}>
              <EmailRoundedIcon style={{ fontSize: 20 }} />
            </Nav.Link>
            <Nav.Link href={navigationContent.socials.github} target="_blank">
              <GitHubIcon style={{ fontSize: 19 }} />
            </Nav.Link>
            <Nav.Link
              href={navigationContent.socials.linkedin}
              target="_blank"
            >
              <LinkedInIcon style={{ fontSize: 21 }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
