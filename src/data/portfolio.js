import flappyBirdVideo from "@project-media/flappy-bird.mov";
import webexCallingExtensionImage from "@project-media/webex-calling-extension.png";
import aiWrapupImage from "@project-media/ai-wrapup.jpg";
import webexCallingImage from "@project-media/webex-calling.png";
import webexMeetingsImage from "@project-media/webex-meetings.png";

export const media = {
  flappyBirdVideo,
  webexCallingExtensionImage,
  aiWrapupImage,
  webexCallingImage,
  webexMeetingsImage,
};

export const profile = {
  name: "Shreyas Sharma",
  shortName: "Shreyas",
  initials: "SS",
  email: "mailto:shreyassharma9912@gmail.com",
  github: "https://github.com/Shreyas281299",
  linkedin: "https://www.linkedin.com/in/shreyas-sharma-685405172/",
};

export const navItems = [
  { label: "Home", sidebarLabel: "home", href: "#intro" },
  { label: "About", sidebarLabel: "about", href: "#about" },
  { label: "Experience", sidebarLabel: "experience", href: "#experience" },
  { label: "Software", sidebarLabel: "software", href: "#software" },
  { label: "Talks", sidebarLabel: "talks", href: "#talks" },
];

export const hero = {
  terminalTitle: "shreyas.profile",
  codeLines: [
    "const shreyas = {",
    '  role: "Software Engineer",',
    '  company: "Cisco",',
    '  domain: "Webex Contact Center",',
    '  builds: ["SDKs", "widgets", "tools"],',
    '  sideQuest: "Unreal Engine 5",',
    '  values: ["clarity", "reuse", "craft"]',
    "};",
  ],
  chips: ["Web Developer", "Forward Deployed Engineer", "Artist", "UE5"],
  description:
    "I’m a self-taught software engineer based out of Bangalore, working at Cisco and building Web SDKs that support over 4.2 million users across Suite and Contact Center. I’m also building AI pipelines for CI/CD, with features like auto-healing.",
  command: "npm i shreyas-sharma --developer-experience --high-signal",
};

export const about = {
  title: "about me",
  paragraphs: [
    {
      lead: "I am currently a Software Engineer at Cisco",
      rest: ", where I keep an eye out for ways to make the developer experience better while building, shipping, and automating software delivery workflows. This increases developer efficiency and helps teams ship faster.",
    },
    {
      lead: "After hours",
      rest: ", I like to play strategy and RPG games. The curiosity around how games work inspired me to build my own game using Unreal Engine 5.",
    },
  ],
  technologies: [
    "TypeScript",
    "React.js",
    "Python",
    "GitHub Actions",
    "Unreal Engine 5",
  ],
};

export const experience = [
  {
    company: "Cisco",
    role: "Software Engineer",
    range: "JUL 2022 - PRESENT",
    highlights: [
      "Building the JavaScript SDK for Cisco Webex, supporting over 4.2 million users across Suite and Contact Center.",
      "Building Contact-Center Widgets, reusable UI widgets for station login, messaging, calling spaces, and multi-party video workflows.",
      "Built the Webex Calling Google Chrome extension, enhanced the extension user interface and experience, and contributed to creating a new Calling SDK.",
      "Responsible for designing and managing the SDK architecture, keeping the monorepo organized for efficient development.",
    ],
  },
  {
    company: "Cisco Intern",
    role: "Technical Undergraduate Intern",
    range: "FEB 2022 - JUN 2022",
    highlights: [
      "Created a flow builder for IVR systems, allowing admins to create IVR call flows for Suite and Contact Center.",
      "Enabled admins to use a drag-and-drop interface, reducing build time from 2 hours to 15 minutes.",
    ],
  },
  {
    company: "Epicenter News",
    role: "Data Science Intern",
    range: "JUN 2021 - DEC 2021",
    highlights: [
      "Created a Chrome extension to keep readers up to date with the latest news.",
      "Enabled users to view the timeline of any news story, helping them understand how coverage evolved over time.",
    ],
  },
];

export const spotlightProjects = [
  {
    name: "Flappy Bird Replica",
    description:
      "A playable Flappy Bird-inspired replica built as a hands-on game development project.",
    tech: "PYTHON, PYGAME, GAME DEVELOPMENT",
    mediaKey: "flappyBirdVideo",
    href: "https://github.com/Shreyas281299/flappy-bird-replica",
    type: "video",
  },
  {
    name: "Webex Calling Chrome Extension",
    description: "Enterprise calling inside Chrome.",
    tech: "CHROME EXTENSION, WEBEX CALLING, JAVASCRIPT",
    mediaKey: "webexCallingExtensionImage",
    href: "https://chromewebstore.google.com/detail/webex-calling-for-chrome/llllflgakifpdcmoanonghipldcpaggn?hl=en",
  },
  {
    name: "Contact Center Widgets",
    description: "Composable widgets for Webex Contact Center workflows.",
    tech: "REACT, CONTACT CENTER, WEBEX WIDGETS",
    mediaKey: "aiWrapupImage",
    href: "https://github.com/webex/widgets",
    packageHref: "https://www.npmjs.com/package/@webex/cc-widgets",
  },
  {
    name: "Webex Calling SDK",
    description:
      "Audio calling SDK flows for browser apps, including call control, transfer, and multi-call experiences.",
    tech: "@WEBEX/CALLING, WEBRTC, TYPESCRIPT",
    mediaKey: "webexCallingImage",
    href: "https://github.com/webex/webex-js-sdk/tree/master/packages/calling",
    packageHref: "https://www.npmjs.com/package/@webex/calling",
  },
  {
    name: "Webex Meetings SDK",
    description:
      "Meetings SDK workflows for rich browser collaboration, media controls, and meeting experiences.",
    tech: "@WEBEX/PLUGIN-MEETINGS, WEBRTC, MEETINGS API",
    mediaKey: "webexMeetingsImage",
    href: "https://github.com/webex/webex-js-sdk/tree/master/packages/@webex/plugin-meetings",
    packageHref: "https://www.npmjs.com/package/@webex/plugin-meetings",
  },
];

export const projects = [
  {
    name: "Webex Calling SDK",
    description:
      "Web calling package for adding audio calling into browser apps. Recent capabilities include call lifecycle flows, hold, resume, transfer, background noise reduction, device updates, call history, voicemail, and call quality metrics.",
    tech: "@webex/calling, WebRTC, TypeScript",
    href: "https://github.com/webex/webex-js-sdk/tree/master/packages/calling",
    packageHref: "https://www.npmjs.com/package/@webex/calling",
  },
  {
    name: "Webex Meetings SDK",
    description:
      "Meetings plugin for the Webex JS SDK. Current platform changes focus on Unified Space Meetings, moving joins from roomId/spaceId toward meetingId or SIP URI flows, reducing PII exposure, and aligning meeting behavior with host licensing.",
    tech: "@webex/plugin-meetings, WebRTC, Meetings API",
    href: "https://github.com/webex/webex-js-sdk/tree/master/packages/@webex/plugin-meetings",
    packageHref: "https://www.npmjs.com/package/@webex/plugin-meetings",
  },
  {
    name: "Contact Center Widgets",
    description:
      "Webex Contact Center widget package for building desktop widgets. Recent updates include multi-party conference support, an address book, Outdial Dialpad UI improvements, end-to-end tests, and station-login visibility fixes.",
    tech: "@webex/cc-widgets, React, Contact Center",
    href: "https://github.com/webex/widgets",
    packageHref: "https://www.npmjs.com/package/@webex/cc-widgets",
  },
  {
    name: "Webex Calling Chrome Extension",
    description:
      "Enterprise-grade Webex Calling inside Google Chrome, including inbound and outbound calling, hold, resume, transfer, visual voicemail, click-to-call, call history, directory search, SSO, and presence.",
    tech: "Chrome Extension, Webex Calling, JavaScript",
    href: "https://chromewebstore.google.com/detail/webex-calling-for-chrome/llllflgakifpdcmoanonghipldcpaggn?hl=en",
  },
  {
    name: "Flappy Bird Replica",
    description:
      "A Flappy Bird-inspired replica I built while exploring game development fundamentals, gameplay loops, collision behavior, scoring, and responsive input.",
    tech: "Python, Pygame, Game Prototyping",
    href: "https://github.com/Shreyas281299/flappy-bird-replica",
  },
];

export const talks = [
  {
    label: "SDK Integration",
    title: "Upgrade Your App with Webex Meetings SDK V3",
    description:
      "A walkthrough of V3 integration, migration considerations, background noise reduction, virtual backgrounds, and demo app patterns.",
    href: "https://app.vidcast.io/share/bcd28aa8-ab52-46bc-8ca8-3c2aa41f8f83",
    sampleHref: "https://github.com/WebexSamples/webex-js-sdk-meeting-demo/",
  },
  {
    label: "Calling SDK",
    title: "Tap into the Webex Web Calling SDK",
    description:
      "A practical deep dive into Webex Web Calling SDK features including audio calling, hold, resume, transfer, voicemail, and call history.",
    href: "https://app.vidcast.io/share/73d00cff-83a7-458e-9857-9c6e29b11943",
    sampleHref: "https://github.com/WebexSamples/webex-js-sdk-calling-demo",
  },
  {
    label: "Advanced Features",
    title: "Unleashing the Power of Multistream",
    description:
      "Techniques and implementation guidance for optimizing multistream capabilities in Webex Meetings SDK applications.",
    href: "https://app.vidcast.io/share/e3cae6cb-6417-4f07-bb48-fce4ae12ab93",
    sampleHref: "https://github.com/WebexSamples/webex-js-sdk-multistream-demo",
  },
];
