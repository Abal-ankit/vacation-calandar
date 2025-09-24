const { default: axios } = require("axios")

const getMonthData = async (req, res) => {
    try {
        const {countryCode, year} = req.query;

        const result = await axios.get(
          `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
        );

        let data = {};
        for(let i = 0; i < result.data.length; i++) {
            data[result.data[i].date] = {"event" : result.data[i].name};
        }
        
        res.json(data);
    } catch (error) {
        console.log(error);
        res.send("Error Happened!");
    }
}

module.exports = getMonthData;
