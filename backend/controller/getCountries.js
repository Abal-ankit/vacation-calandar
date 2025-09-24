const getCountries = async (req, res) => {
    try {
        const countries = await fetch(
          `https://date.nager.at/api/v3/AvailableCountries`
        );

        const data = await countries.json();
        console.log(data);
        return res.json(data);

    } catch (error) {
        console.log(error);
        res.send("Error Happened");
    }
}

module.exports = getCountries;
