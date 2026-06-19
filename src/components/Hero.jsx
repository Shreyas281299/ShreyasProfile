import { hero, profile } from "../data/portfolio";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="intro" className="hero">
      <Reveal className="terminal-card">
        <div className="terminal-window" aria-label="Profile object">
          <div className="terminal-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot blue" />
            <span className="terminal-title">{hero.terminalTitle}</span>
          </div>
          <pre>
            {hero.codeLines.map((line) => (
              <code key={line}>{line}</code>
            ))}
          </pre>
        </div>
      </Reveal>

      <Reveal className="hero-copy">
        <h1>
          Hi, I&apos;m <span>{profile.shortName}</span>
          <b>|</b>
        </h1>
        <div className="chips" aria-label="Portfolio focus areas">
          {hero.chips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
        <p className="hero-description">{hero.description}</p>
        <div className="command-card" aria-label="Current operating mode">
          <span>$</span> {hero.command}
        </div>
        <a className="contact-button" href={profile.email}>
          <Icon name="email" /> Say hi!
        </a>
      </Reveal>
    </section>
  );
}
