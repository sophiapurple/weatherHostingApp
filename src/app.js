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
  let country = response.data.country;
  cities.innerHTML = `${city}, ${country}`;
  let Searchhumidity = document.querySelector("#humidity");
  humidity = Math.round(response.data.temperature.humidity);
  Searchhumidity.innerHTML = `Humidity: ${humidity}%`;
  let searchWind = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  searchWind.innerHTML = `Wind: ${wind}km/h`;
  let Searchtemp = document.querySelector("#temp");
  let temperature = Math.round(response.data.temperature.current);
  Searchtemp.innerHTML = `${temperature}°c`;

  let time = document.querySelector("#day");
  time.innerHTML = formatTime(response.data.time * 1000);
  let image = document.querySelector("#weather-Image");
  image.setAttribute(
    "src",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
  );

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;
}
function searchCity(city) {
  let apiKey = "93cf0a589b1befff9b43f05fbt79bo02";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function searchCensius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temp");
  celsius.innerHTML = Math.round(`${temperature}°`);
}
// function searchFaherient(event) {
//   event.preventDefault();
//   let fahr = Math.round((cent.innerHTML * 9) / 5 + 32);
//   temp = document.querySelector("#temp");
//   temp.innerHTML = `${fahr}°c`;
// }
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let form = document.querySelector("#form-input");
form.addEventListener("submit", handleSubmit);

cent = document.querySelector("#centi");
cent.addEventListener("click", searchCentigrade);

let fahr = document.querySelector("#fahr");
fahr.addEventListener("click", searchFaherient);

searchCity(Lagos);
