const appBasePath = import.meta.env.BASE_URL;
const withBasePath = (hash: string) => `${appBasePath}${hash}`;

export const introContent = {
  terminalAriaLabel: "Profile object",
  terminalTitle: "shreyas.profile",
  profileObject: [
    "const shreyas = {",
    '  role: "Software Engineer",',
    '  company: "Cisco",',
    '  domain: "Webex Contact Center",',
    '  builds: ["SDKs", "widgets", "tools"],',
    '  sideQuest: "Unreal Engine 5",',
    '  values: ["clarity", "reuse", "craft"]',
    "};",
  ],
  greetingPrefix: "Hi, I'm ",
  name: "Shreyas",
  cursor: "|",
  focusAriaLabel: "Portfolio focus areas",
  focusAreas: ["Web Developer", "Forward Deployed Engineer", "Artist", "UE5"],
  description:
    "I’m a self-taught software engineer based out of Bangalore, working at Cisco and building Web SDKs that support over 4.2 million users across Suite and Contact Center. I’m also building AI pipelines for CI/CD, with features like auto-healing.",
  commandAriaLabel: "Current operating mode",
  commandPrompt: "$",
  command: "npm i shreyas-sharma --developer-experience --high-signal",
  contactHref: "https://www.linkedin.com/in/shreyas-sharma-685405172/",
  contactText: " Say hi!",
};

export const aboutContent = {
  sectionTitle: "about me",
  currentRole: "Software Engineer",
  companyName: "Cisco",
  companyHref: "https://www.cisco.com/",
  introPrefix: "I am currently a ",
  introSuffix:
    ", where I keep an eye out for ways to make the developer experience better while building, shipping, and automating software delivery workflows. This increases developer efficiency and helps teams ship faster.",
  techIntro: "Here are some technologies I have been working with:",
  techStack: [
    "TypeScript",
    "React.js",
    "Python",
    "GitHub Actions",
    "Unreal Engine 5",
  ],
  afterHours:
    "After hours, I like to play strategy and RPG games, the curiosity on how to a game works, inspired me to build my own game using Unreal Engine 5.",
  imageAriaLabel: "Shreyas Sharma initials",
  initials: "SS",
};

export const experienceContent = {
  sectionTitle: "experience",
  items: [
    {
      company: "Cisco",
      jobTitle: "Software Engineer @",
      duration: "JUL 2022 - PRESENT",
      desc: [
        "Building the JavaScript SDK for Cisco Webex, supporting over 4.2 million users across Suite and Contact Center.",
        "Building Contact-Center Widgets, reusable UI widgets for station login, messaging, calling spaces, and multi-party video workflows.",
        "Built the Webex Calling Google Chrome extension, enhanced the extension user interface and experience, and contributed to creating a new Calling SDK.",
        "Responsible for designing and managing the SDK architecture, keeping the monorepo organized for efficient development.",
      ],
    },
    {
      company: "Cisco Intern",
      jobTitle: "Technical Undergraduate Intern @",
      duration: "FEB 2022 - JUN 2022",
      desc: [
        "Created a flow builder for IVR systems, allowing admins to create IVR call flows for Suite and Contact Center.",
        "Enabled admins to use a drag-and-drop interface, reducing build time from 2 hours to 15 minutes.",
      ],
    },
    {
      company: "Epicenter News",
      jobTitle: "Data Science Intern @",
      duration: "JUN 2021 - DEC 2021",
      desc: [
        "Created a Chrome extension to keep readers up to date with the latest news.",
        "Enabled users to view the timeline of any news story, helping them understand how coverage evolved over time.",
      ],
    },
  ],
};

export const projectsContent = {
  sectionTitle: "software",
  viewAllText: "View all projects",
  viewAllHref: "https://github.com/Shreyas281299",
  showSpotlightCarousel: true,
  spotlightProjects: [
    {
      name: "Flappy Bird Replica",
      title: "flappy bird replica",
      desc: "A playable Flappy Bird-inspired replica built as a hands-on game development project.",
      techStack: "PYTHON, PYGAME, GAME DEVELOPMENT",
      link: "https://github.com/Shreyas281299/flappy-bird-replica",
      mediaId: "flappyBirdVideo",
      showTitle: false,
    },
    {
      name: "Webex Calling Chrome Extension",
      title: "webex calling chrome extension",
      desc: "Enterprise calling inside Chrome.",
      techStack: "CHROME EXTENSION, WEBEX CALLING, JAVASCRIPT",
      link: "https://chromewebstore.google.com/detail/webex-calling-for-chrome/llllflgakifpdcmoanonghipldcpaggn?hl=en",
      mediaId: "webexCallingExtensionImage",
      imageClass: "carousel-fit-height-image",
      showTitle: false,
    },
  ],
  projects: [
    {
      name: "Webex Calling SDK",
      desc: "Web calling package for adding audio calling into browser apps. Recent capabilities include call lifecycle flows, hold, resume, transfer, background noise reduction, device updates, call history, voicemail, and call quality metrics.",
      techStack: "@webex/calling, WebRTC, TypeScript",
      link: "https://github.com/webex/webex-js-sdk/tree/master/packages/calling",
      open: "https://www.npmjs.com/package/@webex/calling",
    },
    {
      name: "Webex Meetings SDK",
      desc: "Meetings plugin for the Webex JS SDK. Current platform changes focus on Unified Space Meetings, moving joins from roomId/spaceId toward meetingId or SIP URI flows, reducing PII exposure, and aligning meeting behavior with host licensing.",
      techStack: "@webex/plugin-meetings, WebRTC, Meetings API",
      link: "https://github.com/webex/webex-js-sdk/tree/master/packages/@webex/plugin-meetings",
      open: "https://www.npmjs.com/package/@webex/plugin-meetings",
    },
    {
      name: "Contact Center Widgets",
      desc: "Webex Contact Center widget package for building desktop widgets. Recent updates include multi-party conference support, an address book, Outdial Dialpad UI improvements, end-to-end tests, and station-login visibility fixes.",
      techStack: "@webex/cc-widgets, React, Contact Center",
      link: "https://github.com/webex/widgets",
      open: "https://www.npmjs.com/package/@webex/cc-widgets",
    },
    {
      name: "Webex Calling Chrome Extension",
      desc: "Enterprise-grade Webex Calling inside Google Chrome, including inbound and outbound calling, hold, resume, transfer, visual voicemail, click-to-call, call history, directory search, SSO, and presence.",
      techStack: "Chrome Extension, Webex Calling, JavaScript",
      open: "https://chromewebstore.google.com/detail/webex-calling-for-chrome/llllflgakifpdcmoanonghipldcpaggn?hl=en",
    },
    {
      name: "Flappy Bird Replica",
      desc: "A Flappy Bird-inspired replica I built while exploring game development fundamentals, gameplay loops, collision behavior, scoring, and responsive input.",
      techStack: "Python, Pygame, Game Prototyping",
      link: "https://github.com/Shreyas281299/flappy-bird-replica",
    },
  ],
};

export const talksContent = {
  sectionTitle: "talks",
  description:
    "Webinars and technical walkthroughs where I share SDK integration patterns with the Webex developer community.",
  watchText: "Watch webinar",
  appText: "App",
  talks: [
    {
      label: "SDK Integration",
      title: "Upgrade Your App with Webex Meetings SDK V3",
      desc: "A walkthrough of V3 integration, migration considerations, background noise reduction, virtual backgrounds, and demo app patterns.",
      href: "https://app.vidcast.io/share/bcd28aa8-ab52-46bc-8ca8-3c2aa41f8f83",
      sampleHref: "https://github.com/WebexSamples/webex-js-sdk-meeting-demo/",
    },
    {
      label: "Calling SDK",
      title: "Tap into the Webex Web Calling SDK",
      desc: "A practical deep dive into Webex Web Calling SDK features including audio calling, hold, resume, transfer, voicemail, and call history.",
      href: "https://app.vidcast.io/share/73d00cff-83a7-458e-9857-9c6e29b11943",
      sampleHref: "https://github.com/WebexSamples/webex-js-sdk-calling-demo",
    },
    {
      label: "Advanced Features",
      title: "Unleashing the Power of Multistream",
      desc: "Techniques and implementation guidance for optimizing multistream capabilities in Webex Meetings SDK applications.",
      href: "https://app.vidcast.io/share/e3cae6cb-6417-4f07-bb48-fce4ae12ab93",
      sampleHref:
        "https://github.com/WebexSamples/webex-js-sdk-multistream-demo",
    },
  ],
};

export const navigationContent = {
  brand: "Shreyas Sharma",
  links: [
    { label: "Home", sidebarLabel: "home", href: withBasePath("#intro") },
    { label: "About", sidebarLabel: "about", href: withBasePath("#about") },
    {
      label: "Experience",
      sidebarLabel: "experience",
      href: withBasePath("#experience"),
    },
    { label: "Software", sidebarLabel: "software", href: withBasePath("#projects") },
    { label: "Talks", sidebarLabel: "talks", href: withBasePath("#art") },
  ],
  socials: {
    email: "mailto:shreyassharma9912@gmail.com",
    github: "https://github.com/Shreyas281299",
    linkedin: "https://www.linkedin.com/in/shreyas-sharma-685405172/",
  },
};

export const creditsContent = {
  builtBy: "Built by Shreyas Sharma. ",
  rights: "All rights reserved. ©",
};

export const externalLinksContent = {
  npmHost: "npmjs.com",
  npmLogoSrc: `${appBasePath}assets/npm-logo.png`,
  npmAltText: "npm package",
};

export const appContent = {
  mountLog: "App mounting...",
};
