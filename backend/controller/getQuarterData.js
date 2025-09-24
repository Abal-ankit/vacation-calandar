const { default: axios } = require("axios")

const getQuarterData = async (req, res) => {
    try {
        const {countryCode, year} = req.query;

        const result = await axios.get(
          `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
        );

        res.json(result.data);
    } catch (error) {
        console.log(error);
        res.send("Error");
    }
}

module.exports = getQuarterData;
