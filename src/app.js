function formatTime(timeStamp) {
  let date = new Date(timeStamp);
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  currentMinutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${currentHour}:${currentMinutes}`;
}
function displayWeather(response) {
  console.log(response);
  cityInput = document.querySelector("#city-input").value;
  cities = document.querySelector("h1");
  city = response.data.city;

  cities.innerHTML = `${city}`;
  let Searchhumidity = document.querySelector("#humidity");
  humidity = Math.round(response.data.temperature.humidity);
  Searchhumidity.innerHTML = `Humidity: ${humidity}%`;
  let searchWind = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  searchWind.innerHTML = `Wind: ${wind}km/h`;
  celsius = response.data.temperature.current;
  let Searchtemp = document.querySelector("#temp");
  let temperature = Math.round(celsius);
  Searchtemp.innerHTML = `${temperature}`;

  let time = document.querySelector("#day");
  time.innerHTML = formatTime(response.data.time * 1000);
  let image = document.querySelector("#weather-Image");
  image.setAttribute("src", response.data.condition.icon_url);

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `Description: ${response.data.condition.description}`;
}
function searchCity(city) {
  let apiKey = "93cf0a589b1befff9b43f05fbt79bo02";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}
function searchFaherient(event) {
  event.preventDefault();

  temperature = document.querySelector("#temp");
  let fahr = (celsius * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahr);
}
function searchCelsius(event) {
  event.preventDefault();
  temperature = document.querySelector("#temp");

  celsiusElement = celsius;
  temperature.innerHTML = Math.round(celsiusElement);
}
let celsius = null;

let form = document.querySelector("#form-input");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", searchCelsius);

let fahr = document.querySelector("#fahrenheit-link");
fahr.addEventListener("click", searchFaherient);

searchCity("Lagos");
