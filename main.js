const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your OpenWeather API key
const KELVIN = 273.15;

const locationElement = document.getElementById("location");
const coordsElement = document.getElementById("coords");
const iconElement = document.getElementById("icon");
const tempElement = document.getElementById("temperature");
const descElement = document.getElementById("description");
const errorElement = document.getElementById("error");

// Ask for location
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeather(lat, lon);
        },
        error => {
            // Permission denied → fallback to simulator (New Delhi)
            errorElement.textContent = "Using simulator mode (New Delhi)";
            getWeather(28.6139, 77.2090);
        }
    );
} else {
    errorElement.textContent = "Geolocation not supported, using simulator mode";
    getWeather(28.6139, 77.2090);
}

// Fetch weather data
function getWeather(lat, lon) {
    coordsElement.textContent = `Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            locationElement.textContent = `${data.name}, ${data.sys.country}`;
            tempElement.textContent = `${Math.round(data.main.temp - KELVIN)}°C`;
            descElement.textContent = data.weather[0].description;
            iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
        })
        .catch(err => {
            errorElement.textContent = "Error fetching weather data";
            console.error(err);
        });
}

