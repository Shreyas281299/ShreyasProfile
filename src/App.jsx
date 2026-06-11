import React, { useState } from "react";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Art from "./components/Art";
import Credits from "./components/Credits";
import NavBar from "./components/NavBar";
import SidebarNav from "./components/SidebarNav";
import DriveMode from "./drive-mode/DriveMode";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import "./styles/Global.css";

function App() {
  const { pathname } = useLocation();
  const [isDriveModeActive, setIsDriveModeActive] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`App ${isDriveModeActive ? "drive-world-active" : ""}`}>
      <NavBar />
      <SidebarNav />
      <DriveMode
        isActive={isDriveModeActive}
        onActiveChange={setIsDriveModeActive}
      />
      <div id="content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Intro />
                <About />
                <Experience />
                <Projects />
                <Art />
                <Credits />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
