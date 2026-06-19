import DriveWorldCanvas from "./DriveWorldCanvas";
import "./DriveMode.css";

export function DriveMode({ isActive, onActiveChange }) {
  return (
    <div className={`drive-mode ${isActive ? "drive-mode-active" : ""}`}>
      <div className="drive-mode-controls">
        <button
          type="button"
          className="drive-mode-toggle"
          onClick={() => onActiveChange(!isActive)}
        >
          drive mode
        </button>
      </div>

      {isActive && <DriveWorldCanvas />}
    </div>
  );
}
