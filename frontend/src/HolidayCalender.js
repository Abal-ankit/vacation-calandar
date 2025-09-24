import React, { useEffect, useState } from "react";
import MyCalendar from "./MyCalendar";

function HolidayCalender() {
  const [dayData, setDayData] = useState(null);
  const [selected, setSelected] = useState("AD");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `http://localhost:8000/month?countryCode=${selected}&year=2025`
      );

      const data = await res.json();
      setDayData(data);
      console.log(data);
    };

    getData();
  }, [selected]);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetch("http://localhost:8000/countries");

      const option = await data.json();

      setOptions(option);
      console.log(option);
    };

    getCountries();
  }, []);

  const handleChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    console.log(options[selectedIndex]);
    setSelected(options[selectedIndex].countryCode);
  };

  return (
    <div>
      <label>
        Country:{" "}
        <select value={selected} onChange={handleChange}>
          {options.map((opt, index) => (
            <option key={index} value={opt.name} name={opt.countryCode}>
              {opt.name}
            </option>
          ))}
        </select>
      </label>
      {dayData && <MyCalendar dayData={dayData} />}
    </div>
  );
}

export default HolidayCalender;
