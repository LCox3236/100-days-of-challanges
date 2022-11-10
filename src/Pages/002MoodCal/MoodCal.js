import React, { useState, useEffect } from "react";
import "./MoodCal.css";
import Calendar from "./Components/Calendar";
import {
  BsEmojiLaughing,
  BsEmojiSmile,
  BsEmojiExpressionless,
  BsEmojiFrown,
  BsEmojiAngry,
} from "react-icons/bs";
export default function MoodCal() {
  const currentYear = 2022;
  const months = [
    { month: "January", days: [] },
    { month: "February", days: [] },
    { month: "March", days: [] },
    { month: "April", days: [] },
    { month: "May", days: [] },
    { month: "June", days: [] },
    { month: "July", days: [] },
    { month: "August", days: [] },
    { month: "September", days: [] },
    { month: "October", days: [] },
    { month: "November", days: [] },
    { month: "December", days: [] },
  ];
  const moodFaces = [
    <BsEmojiLaughing />,
    <BsEmojiSmile />,
    <BsEmojiExpressionless />,
    <BsEmojiFrown />,
    <BsEmojiAngry />,
  ];
  const colors = ["#2d6b5f", "#72e3a6", "#dff4c7", "#edbf98", "#ea3d36"];
  const defaultColor = "#888";
  const [activeColor, setActiveColor] = useState(() => {
    return "";
  });

  const getAllDays = (year) => {
    const firstDay = new Date(`January 1 ${currentYear}`);
    const lastDay = new Date(`December 31 ${currentYear}`);
    const days = [firstDay];
    let lastDayInArray = firstDay;
    months[lastDayInArray.getMonth()].days.push(days[days.length - 1]);
    while (lastDayInArray.getTime() !== lastDay.getTime()) {
      days.push(addDays(lastDayInArray, 1));
      lastDayInArray = days[days.length - 1];
      months[lastDayInArray.getMonth()].days.push(days[days.length - 1]);
    }
    return days;
  };
  //console.log(months);
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  getAllDays(currentYear);

  function moodSelected(e) {
    console.log(e.currentTarget);
    const moods = document.querySelectorAll(".mood");
    moods.forEach((mood) => {
      mood.classList.remove("selected");
    });
    e.currentTarget.classList.add("selected");
    setActiveColor(e.currentTarget.style.color);
  }
  useEffect(() => {
    console.log(`active color ${activeColor}`);
  }, [activeColor]);

  return (
    <div>
      <header>
        <h1>Mood Calendar</h1>
        <p>~ color each day depending on what your mood was / is ~</p>
      </header>
      <div className="mood-container">
        <p>Select mood:</p>
        <div className="moods">
          {moodFaces.map((mood, index) => {
            return (
              <div key={index}>
                <button
                  className="mood"
                  style={{ color: `${colors[index]}` }}
                  onClick={moodSelected}
                >
                  <i>{mood}</i>
                </button>
              </div>
            );
          })}
        </div>
        <p>then click on the circles below</p>
      </div>
      <div className="calendar-container">
        {months.map((month, index) => (
          <Calendar
            key={index}
            index={index}
            month={month.month}
            dates={month.days}
            color={activeColor}
          />
        ))}
      </div>
    </div>
  );
}

// if (mood.classList.contains("selected")) {
//   mood.classList.remove("selected");
//   setActiveColor(defaultColor);
// } else {
//   moods.forEach((mood) => {
//     mood.classList.remove("selected");
//   });

//   e.currentTarget.classList.add("selected");
//   setActiveColor(e.currentTarget.style.color);
// }
// });
// }
