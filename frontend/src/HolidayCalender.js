import React, { useEffect, useState } from "react";
import MyCalendar from "./MyCalendar";
import "./MyCalendar.css";

function HolidayCalender() {
  const [dayData, setDayData] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("AD");
  const [selectedCountryName, setSelectedCountryName] = useState("Andorra");
  const [year, setYear] = useState(new Date().getFullYear());
  const [view, setView] = useState("month");

  // Fetch holiday data whenever country or year changes
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/month?countryCode=${selectedCountryCode}&year=${year}`
        );
        const data = await res.json();
        setDayData(data);
      } catch (error) {
        console.error("Error fetching holiday data:", error);
      }
    };
    getData();
  }, [selectedCountryCode, year]);

  // Fetch available countries on component mount
  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch("http://localhost:8000/countries");
        const data = await res.json();
        setOptions(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    getCountries();
  }, []);

  const handleCountryChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setSelectedCountryCode(options[selectedIndex].countryCode);
    setSelectedCountryName(e.target.value);
  };

  const handleViewChange = (e) => {
    setView(e.target.value);
  };

  return (
    <div className="holiday-calendar-wrapper">
      <div className="controls">
        <label className="control-label">
          Country:{" "}
          <select
            className="control-select"
            value={selectedCountryName}
            onChange={handleCountryChange}
          >
            {options.map((opt, index) => (
              <option key={index} value={opt.name}>
                {opt.name}
              </option>
            ))}
          </select>
        </label>

        <label className="control-label">
          View:{" "}
          <select
            className="control-select"
            value={view}
            onChange={handleViewChange}
          >
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
          </select>
        </label>
      </div>

      {dayData && (
        <MyCalendar
          dayData={dayData}
          setYear={setYear}
          year={year}
          view={view}
        />
      )}
    </div>
  );
}

export default HolidayCalender;
