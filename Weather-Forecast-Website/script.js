const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const errorMessage = document.getElementById("error-message");

async function checkWeather(city) {
    errorMessage.style.display = "none";
    weatherInfo.style.display = "none";

    try {
        const response = await fetch(`/api/weather?city=${city}`); 
        if (!response.ok) {
            errorMessage.textContent = "City not found or an error occurred. Please try again.";
            errorMessage.style.display = "block";
            return;
        }
        const data = await response.json();

        cityName.textContent = data.name;
        temp.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;

        weatherInfo.style.display = "block";

    } catch (error) {
        errorMessage.textContent = "An error occurred. Please try again later.";
        errorMessage.style.display = "block";
    }
}
searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value);
});
