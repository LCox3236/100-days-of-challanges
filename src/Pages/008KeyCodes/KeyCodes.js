import React, { useEffect, useState } from "react";
import "./KeyCodes.css";

export default function KeyCodes() {
  const [displayText, setDisplayText] = useState(() => {
    return "Press Key To Get KeyCode";
  });
  function setDisplay(e) {
    setDisplayText(
      <div id="key-container">
        <div className="key">
          {e.key === " " ? "space" : e.key}
          <small>event.key</small>
        </div>
        <div className="key">
          {e.keyCode}
          <small>event.keyCode</small>
        </div>
        <div className="key">
          {e.code}
          <small>event.code</small>
        </div>
      </div>
    );
  }

  function keyPress(e) {
    console.log(e);
    setDisplay(e);
  }

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  });

  return <div className="container">{displayText}</div>;
}
