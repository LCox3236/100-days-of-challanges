import React, { useEffect } from "react";
import "./Calendar.css";
export default function Calendar(props) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const emptySpaces = [];

  props.dates.forEach((date) => {
    if (date.getDate() === 1 && date.getDay() !== 0) {
      for (let i = 0; i < date.getDay(); i++) {
        emptySpaces.push(createEmptySpot());
      }
    }
  });

  function createDateEl(date) {
    const day = date.getDate();
    return (
      <div className="days">
        <span class="circle">{day}</span>
      </div>
    );
  }

  function createEmptySpot() {
    return <div className="days"></div>;
  }

  function setColor(e) {
    e.currentTarget.style.backgroundColor = props.color;
  }

  // console.log(props.dates);
  // console.log(emptySpaces);
  return (
    <div>
      <div className={`months month_${props.index}`}>
        <h3>{props.month}</h3>
        <div className="week_days_container">
          {weekDays.map((day, index) => (
            <div key={index} className="week_days">
              {day}
            </div>
          ))}
        </div>
        <div className="days_container">
          {emptySpaces.map((item) => {
            return item;
          })}
          {props.dates.map((date, index) => {
            return (
              <div className="days">
                <span onClick={setColor} className="circle">
                  {date.getDate()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
