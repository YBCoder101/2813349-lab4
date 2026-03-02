
async function searchCountry(countryName) {
    const country = document.getElementById('country-info');
    const spinner = document.getElementById('loading-spinner');
    const errorMessage = document.getElementById('error-message');
    const borders = document.getElementById('bordering-countries');

    try {
        // Show loading spinner
        spinner.classList.remove("hidden");
        // Fetch country data

        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        const country = data[0];
        // Update DOM
        document.getElementById('country-info').innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag" width = "80%">
        `;
        // Fetch bordering countries
        if (country.borders){
            for (let code of country.borders){
                const neighbour_response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
                const cdata = await neighbour_response.json();
                const borderCountry = cdata[0];
               borders.innerHTML += `
                    <section class="border-card">
                        <p>${borderCountry.name}</p>
                        <img src="${borderCountry.flags.svg}" alt="${borderCountry.name.common} flag" width = "80%">
                    </section>
                `;
            }
        } else {
            borders.innerHTML = "<p>No bordering countries</p>";
        }  
        // Update bordering countries section
    } catch (error) {
        errorMessage.textContent = "Error: " + error.message;
        // Show error message
    } finally {
        spinner.classList.add("hidden")
        // Hide loading spinner
    }

    country = "";
    errorMessage="";
    borders.innerHTML="";
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});

