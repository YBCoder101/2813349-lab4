
async function searchCountry(countryName) {
    const spinner = document.getElementById('loading-spinner');
    const errorMessage = document.getElementById('error-message');
    const bordering = document.getElementById('bordering-countries');

    try {

        bordering.innerHTML = "";
        errorMessage.textContent = "";

        // Show loading spinner
        spinner.classList.remove("hidden");
        // Fetch country data

        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
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
        // Update bordering countries section               
                bordering.innerHTML += `
                    <section class="border-card">
                        <p>${borderCountry.name.common}</p>
                        <img src="${borderCountry.flags.svg}" alt="${borderCountry.name.common} flag" width = "40%">
                    </section>
                `;
            }

        } else {
            bordering.innerHTML = "<p>No bordering countries</p>";
        }  


    } catch (error) {
        errorMessage.textContent = "Error: " + error.message;
        // Show error message
    } finally {
        spinner.classList.add("hidden")
        // Hide loading spinner
    }
    
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});

document.getElementById('country-input').addEventListener('keypress', (event) => {
    if (event.key === "Enter") {  
        const countryName = event.target.value.trim();
        if (countryName) searchCountry(countryName);
    }
})

