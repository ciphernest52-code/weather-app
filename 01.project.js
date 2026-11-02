const base_url = 'https://api.openweathermap.org/data/2.5/weather';
const api_key = 'f7349b933a561881c83fa4c5d4b4b5db';

const input = document.getElementById('cityInput');
const button = document.getElementById('searchButton');
const result = document.getElementById('weatherResult');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');

const cityNameText = document.getElementById('cityNameText');
const tempText = document.getElementById('tempText');
const humidityText = document.getElementById('humidityText');
const windText = document.getElementById('windText');
const descText = document.getElementById('descText');

button.addEventListener('click', getweather);

async function getweather(event) {
  event.preventDefault();
  clearMessages();

  const city = input.value.trim();

  if (city === "") {
    showError("Please enter a city name");
    return;
  }

  const url = `${base_url}?q=${city}&appid=${api_key}&units=metric`;

  loading.classList.remove("hidden");

  try {
    const response = await fetch(url);
    const data = await response.json();

    loading.classList.add("hidden");

    if (!response.ok) {
      showError("City not found");
      return;
    }

    const cityName = data.name;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;

    cityNameText.textContent = cityName;
    tempText.textContent = "Temperature: " + temperature + " °C";
    humidityText.textContent = "Humidity: " + humidity + " %";
    windText.textContent = "Wind speed: " + windSpeed + " m/s";
    descText.textContent = "Weather: " + description;

    result.classList.remove("hidden");
  } catch (error) {
    loading.classList.add("hidden");
    showError("Something went wrong, try again");
    console.log(error);
  }
}

function clearMessages() {
  loading.classList.add("hidden");
  result.classList.add("hidden");
  errorMessage.classList.add("hidden");
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}
input.addEventListener('keydown', function (event) {
  if (event.key === "Enter") {
    getweather(event);
  }
});