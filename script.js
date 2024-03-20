const weatherInfo = document.getElementById("weatherInfo");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const city = document.getElementById("city");
const country = document.getElementById("country");
const feels = document.getElementById("feels");
const description = document.getElementById("description");
const wind = document.getElementById("wind");
const direction = document.getElementById("direction");

const apiKey = "89508ecfc024a2bf815555cb5748aafa";

document.getElementById("getWeatherBtn").addEventListener("click", handleWeatherRequest);

document.getElementById("cityInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleWeatherRequest();
    }
});

function handleWeatherRequest() {
    const cityName = document.getElementById("cityInput").value;
        if (cityName === "") {
            alert("Por favor, informe o nome da cidade.");
            return;
        }
        weatherRequest(cityName);
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function weatherRequest(cityName) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=metric&lang=pt_br`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            temperature.textContent = data.main.temp + "°C";
            humidity.textContent = data.main.humidity + "%";
            sunrise.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            sunset.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            city.textContent = data.name;
            country.textContent = data.sys.country;
            feels.textContent = data.main.feels_like + "°C";
            description.textContent = capitalize(data.weather[0].description);
            wind.textContent = (data.wind.speed) + " m/s";
            direction.textContent = data.wind.deg + "°";


            weatherInfo.style.display = "block";
        })
        .catch(error => {
            alert("Erro ao obter informações do clima.");
            console.error(error);
        });
}
