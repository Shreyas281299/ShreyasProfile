import React from "react";
import { driveModeContent } from "../constants";
import DriveWorldCanvas from "./DriveWorldCanvas";
import "./DriveMode.css";

const DriveMode = ({ isActive, onActiveChange }) => {
  return (
    <div className={`drive-mode ${isActive ? "drive-mode-active" : ""}`}>
      <div className="drive-mode-controls">
        <button
          type="button"
          className="drive-mode-toggle"
          onClick={() => onActiveChange(!isActive)}
        >
          {driveModeContent.enableLabel}
        </button>
      </div>

      {isActive && <DriveWorldCanvas />}
    </div>
  );
};

export default DriveMode;
