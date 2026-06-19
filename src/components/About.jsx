import { about, profile } from "../data/portfolio";
import { AnimatedList } from "./AnimatedList";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="page-section about-section">
      <Reveal>
        <SectionHeading title={about.title} />
      </Reveal>

      <div className="about-layout">
        <Reveal className="about-copy">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.lead}>
              <strong>{paragraph.lead}</strong>
              {paragraph.rest}
            </p>
          ))}
          <p>Here are some technologies I have been working with:</p>
          <AnimatedList
            className="tech-list"
            items={about.technologies}
            renderItem={(technology) => technology}
          />
        </Reveal>

        <Reveal className="initials-card" aria-label="Shreyas Sharma initials">
          <span>{profile.initials}</span>
        </Reveal>
      </div>
    </section>
  );
}
