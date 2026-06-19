# Assets

This folder contains non-source assets used by the portfolio.

- `media/projects/`: project screenshots, videos, and other bundled media imported by React and drive mode through `@project-media`.
- `public/`: files served by Vite as public root assets, such as `favicon.svg`, `manifest.json`, `robots.txt`, and fonts.
- `static/`: runtime assets loaded by the drive-mode resource loader from `/static/`, including Draco decoder files.

Shader source lives in the root `shaders/` directory because drive-mode JavaScript imports it directly at build time.
