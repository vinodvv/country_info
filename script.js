document.getElementById("searchBtn").addEventListener("click", async () => {
    const country = document.getElementById("countryInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!country) {
        resultDiv.innerHTML = "<p>Please enter a country name.</p>";
        return;
    }

    resultDiv.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        if (!response.ok) throw new Error("Country not found");

        const data = await response.json();
        const countryData = data[0];

        const name = countryData.name.common;
        const capital = countryData.capital ? countryData.capital[0] : "N/A";
        const region = countryData.region;
        const population = countryData.population.toLocaleString();
        const languages = countryData.languages
            ? Object.values(countryData.languages).join(", ")
            : "N/A";
        const currencies = countryData.currencies
            ? Object.values(countryData.currencies)
                .map(currency => `${currency.name} (${currency.symbol || "N/A"})`)
                .join(", ")
            : "N/A";
        const latlng = countryData.latlng
            ? Object.values(countryData.latlng).join(", ")
            : "N/A";
        const borders = countryData.borders
            ? Object.values(countryData.borders).join(", ")
            : "N/A";
        const timezone = countryData.timezones;

        resultDiv.innerHTML = `
            <h2>${name}</h2>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Region:</strong> ${region}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Languages:</strong> ${languages}</p>
            <p><strong>Currencies:</strong> ${currencies}</p>
            <p><strong>Coordinates (LAT, LONG):</strong> ${latlng}</p>
            <p><strong>Neighbours:</strong> ${borders}</p>
            <p><strong>Timezone:</strong> ${timezone}</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
