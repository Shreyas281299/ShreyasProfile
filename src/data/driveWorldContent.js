import {
  about,
  experience,
  hero,
  profile,
  projects,
  spotlightProjects,
  talks,
} from "./portfolio";

export const introContent = {
  terminalTitle: hero.terminalTitle,
  greetingPrefix: "Hi, I'm ",
  name: profile.shortName,
  focusAreas: hero.chips,
  description: hero.description,
  commandPrompt: "$",
  command: hero.command,
  contactHref: profile.linkedin,
  contactText: "Say hi!",
};

export const aboutContent = {
  sectionTitle: about.title,
  currentRole: "Software Engineer",
  companyName: "Cisco",
  introPrefix: "I am currently a ",
  introSuffix: about.paragraphs[0].rest,
  techIntro: "Here are some technologies I have been working with:",
  techStack: about.technologies,
  afterHours: about.paragraphs[1].rest.replace(/^, /, ""),
  imageAriaLabel: "Shreyas Sharma initials",
};

export const experienceContent = {
  sectionTitle: "experience",
  items: experience.map((job) => ({
    company: job.company,
    jobTitle: `${job.role} @`,
    duration: job.range,
    desc: job.highlights,
  })),
};

export const projectsContent = {
  sectionTitle: "software",
  spotlightProjects,
  projects: projects.map((project) => ({
    name: project.name,
    desc: project.description,
    techStack: project.tech,
    link: project.href,
    open: project.packageHref,
  })),
};

export const talksContent = {
  sectionTitle: "talks",
  watchText: "Watch webinar",
  appText: "App",
  talks: talks.map((talk) => ({
    label: talk.label,
    title: talk.title,
    desc: talk.description,
    href: talk.href,
    sampleHref: talk.sampleHref,
  })),
};
