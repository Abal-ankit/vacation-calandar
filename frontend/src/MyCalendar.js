import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.css";

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

const MyCalendar = ({ dayData, setYear, year, view }) => {
  const [date, setDate] = useState(new Date());
  const [quarterIndex, setQuarterIndex] = useState(
    Math.floor(new Date().getMonth() / 3)
  );

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

  const handleActiveDateChange = ({ activeStartDate }) => {
    const newYear = activeStartDate.getFullYear();
    if (newYear !== year) {
      setYear(newYear);
    }
  };

  const getQuarterMonths = () => {
    const startMonth = quarterIndex * 3;
    return [startMonth, startMonth + 1, startMonth + 2];
  };

  const handlePrevQuarter = () => {
    if (quarterIndex === 0) {
      setQuarterIndex(3); 
      setYear(year - 1);
    } else {
      setQuarterIndex(quarterIndex - 1);
    }
  };

  const handleNextQuarter = () => {
    if (quarterIndex === 3) {
      setQuarterIndex(0); 
      setYear(year + 1);
    } else {
      setQuarterIndex(quarterIndex + 1);
    }
  };

  if (view === "quarter") {
    const quarterMonths = getQuarterMonths();

    return (
      <div className="quarter-view">
        <div className="quarter-nav">
          <button onClick={handlePrevQuarter}>◀ Prev</button>
          <span>
            Q{quarterIndex + 1} {year}
          </span>
          <button onClick={handleNextQuarter}>Next ▶</button>
        </div>

        {quarterMonths.map((month) => (
          <Calendar
            key={month}
            value={new Date(year, month, 1)}
            onChange={setDate}
            activeStartDate={new Date(year, month, 1)}
            view="month"
            onActiveStartDateChange={handleActiveDateChange}
            className="quarter-calendar"
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
                    {info && (
                      <span className="event-indicator">{info.event}</span>
                    )}
                  </div>
                );
              }
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <Calendar
        onChange={setDate}
        value={date}
        className="custom-calendar"
        onActiveStartDateChange={handleActiveDateChange}
        view={view}
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
