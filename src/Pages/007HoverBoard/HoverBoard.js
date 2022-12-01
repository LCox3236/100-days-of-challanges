import React from "react";
import "./HoverBoard.css";
export default function HoverBoard() {
  const colors = ["#e74c3c", "#8e44ad", "#3498db", "#e67e22", "#2ecc71"];
  const SQUARES_NR = new Array(500).fill(0);

  function setColorToEl(element) {
    const color = getRandomColor();
    element.target.style.background = color;
    element.target.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  }
  function removeColorFromEl(element) {
    element.target.style.background = "#1d1d1d";
    element.target.style.boxShadow = `0 0 2px #000`;
  }

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <div>
      <div className="hover-board-container">
        {SQUARES_NR.map((x, i) => (
          <div
            className="square"
            index={i}
            onMouseOver={setColorToEl}
            onMouseOut={removeColorFromEl}
          ></div>
        ))}
      </div>
    </div>
  );
}
