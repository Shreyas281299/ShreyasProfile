import { useState } from "react";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Software } from "./components/Software";
import { Talks } from "./components/Talks";
import { DriveMode } from "./features/drive-mode/DriveMode";

export default function App() {
  const [driveModeActive, setDriveModeActive] = useState(false);

  return (
    <div className={`app-shell ${driveModeActive ? "drive-world-active" : ""}`}>
      <Nav />
      <main id="content">
        <Hero />
        <About />
        <Experience />
        <Software />
        <Talks />
      </main>
      <Footer />
      <DriveMode isActive={driveModeActive} onActiveChange={setDriveModeActive} />
    </div>
  );
}
