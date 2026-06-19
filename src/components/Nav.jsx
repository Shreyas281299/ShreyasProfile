import { useEffect, useState } from "react";
import { navItems, profile } from "../data/portfolio";
import { Icon } from "./Icons";

const closeMenu = (setOpen) => {
  setOpen(false);
};

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="navbar">
      <a className="brand" href="#intro" onClick={() => closeMenu(setOpen)}>
        {profile.name}
      </a>

      <button
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        className="menu-button"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`primary-nav ${open ? "is-open" : ""}`}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => closeMenu(setOpen)}>
            {item.label}
          </a>
        ))}
        <div className="nav-socials" aria-label="Social links">
          <a href={profile.email} aria-label="Email Shreyas">
            <Icon name="email" />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Icon name="github" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Icon name="linkedin" />
          </a>
        </div>
      </nav>
    </header>
  );
}
