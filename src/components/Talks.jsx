import { talks } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Talks() {
  return (
    <section id="talks" className="page-section talks-section">
      <Reveal>
        <SectionHeading title="talks" />
      </Reveal>

      <Reveal className="talks-intro">
        Webinars and technical walkthroughs where I share SDK integration patterns with the Webex developer community.
      </Reveal>

      <div className="talk-grid">
        {talks.map((talk) => (
          <Reveal className="talk-card" key={talk.title}>
            <span>{talk.label}</span>
            <h3>{talk.title}</h3>
            <p>{talk.description}</p>
            <div className="talk-actions">
              <a href={talk.href} target="_blank" rel="noopener noreferrer">
                Watch webinar
              </a>
              <a href={talk.sampleHref} target="_blank" rel="noopener noreferrer">
                App
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
