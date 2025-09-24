const express = require('express');
const cors = require('cors');

const getMonthData = require("./controller/getMonthData.js");
const getCountries = require('./controller/getCountries.js');

const app = express();

app.use(cors());
app.get("/month", getMonthData);
app.get("/countries", getCountries);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
})
