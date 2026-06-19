import { useState } from "react";
import { experience } from "../data/portfolio";
import { AnimatedList } from "./AnimatedList";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeJob = experience[activeIndex];

  return (
    <section id="experience" className="page-section experience-section">
      <Reveal>
        <SectionHeading title="experience" />
      </Reveal>

      <Reveal className="experience-shell">
        <div className="job-tabs" role="tablist" aria-label="Work experience">
          {experience.map((job, index) => (
            <button
              aria-controls={`job-panel-${index}`}
              aria-selected={activeIndex === index}
              className={activeIndex === index ? "is-active" : ""}
              id={`job-tab-${index}`}
              key={job.company}
              onClick={() => setActiveIndex(index)}
              role="tab"
              type="button"
            >
              {job.company}
            </button>
          ))}
        </div>

        <article
          aria-labelledby={`job-tab-${activeIndex}`}
          className="job-panel"
          id={`job-panel-${activeIndex}`}
          role="tabpanel"
        >
          <h3>
            {activeJob.role} <span>@ {activeJob.company}</span>
          </h3>
          <p className="job-range">{activeJob.range}</p>
          <AnimatedList
            key={activeJob.company}
            items={activeJob.highlights}
            renderItem={(highlight) => highlight}
          />
        </article>
      </Reveal>
    </section>
  );
}
