import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.css";

// Function to get ISO week number
const getWeekNumber = (date) => {
  const tempDate = new Date(date.getTime());
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
  const week1 = new Date(tempDate.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((tempDate.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

const MyCalendar = ({ dayData }) => {
  const [date, setDate] = useState(new Date());

  const weekColors = useMemo(() => {
    const weekCount = {};

    Object.keys(dayData).forEach((key) => {
      const d = new Date(key);
      const weekNum = getWeekNumber(d);
      const weekKey = `${d.getFullYear()}-W${weekNum}`;
      weekCount[weekKey] = (weekCount[weekKey] || 0) + 1;
    });

    const colors = {};
    Object.entries(weekCount).forEach(([weekKey, count]) => {
      colors[weekKey] = count === 1 ? "lightgreen" : "darkgreen";
    });

    return colors;
  }, [dayData]);

  return (
    <div className="calendar-container">
      <Calendar
        onChange={setDate}
        value={date}
        className="custom-calendar"
        tileContent={({ date, view }) => {
          if (view === "month") {
            const key =
              date.getFullYear() +
              "-" +
              String(date.getMonth() + 1).padStart(2, "0") +
              "-" +
              String(date.getDate()).padStart(2, "0");

            const info = dayData[key];

            const weekNum = getWeekNumber(date);
            const weekKey = `${date.getFullYear()}-W${weekNum}`;
            const weekColor = weekColors[weekKey];

            return (
              <div
                className={`calendar-tile ${info ? "has-event" : ""}`}
                style={{
                  backgroundColor: weekColor ? weekColor : "transparent",
                  color: info ? info.color : "inherit",
                }}
              >
                {info && <span className="event-indicator">{info.event}</span>}
              </div>
            );
          }
        }}
      />
    </div>
  );
};

export default MyCalendar;
